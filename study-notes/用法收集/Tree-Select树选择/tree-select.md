# mui 树形控件 react window 虚拟列表

## tree-select

### index

```ts
import React, { useEffect, useImperativeHandle } from "react";
import {
  Box,
  Checkbox,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { FixedSizeList } from "react-window";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import { useAction } from "./hook";
import { ArrowDropDownIcon } from "@mui/x-date-pickers";
import FolderIcon from "@mui/icons-material/Folder";
import styles from "./index.module.scss";
import { TreeNode } from "../add-users-model/props";
import { TreeSelectRef } from "./props";

export interface TreeSelectRef {
  selectNode: (item: TreeNode) => void;
}

export const TreeSelectList: React.FC<{
  treeData: TreeNode[]; //树形数据
  searchValue: string;
  ref: React.Ref<TreeSelectRef>; //搜索list
  setSelectedData: (data: TreeNode[]) => void;
}> = React.forwardRef(({ treeData, searchValue, setSelectedData }, ref) => {
  const {
    isSearch,
    searchDisplayTreeData,
    displayFlatUpdateTreeData,
    selectedNodes,
    expandedNodes,
    indeterminateNodes,
    selectNode,
    toggleNode,
  } = useAction(treeData, searchValue, setSelectedData);

  useImperativeHandle(ref, () => ({ selectNode }), [selectedNodes]); //暴露选中方法给其他组件使用

  const renderListItem: React.FC<{
    index: number;
    style: React.CSSProperties;
  }> = ({ index, style }) => {
    const item = isSearch
      ? searchDisplayTreeData[index]
      : displayFlatUpdateTreeData[index];

    const isSelected = selectedNodes.has(item.id);

    const isExpanded = isSearch
      ? expandedNodes.searchExpandedNodes.has(item.id)
      : expandedNodes.displayExpandedNodes.has(item.id);

    const isIndeterminate = indeterminateNodes.has(item.id);

    const hasChildren = item.children.length > 0;

    return (
      <div style={style}>
        <ListItem
          key={item.idRoute.toString()}
          style={{ paddingLeft: `${2 * (item.idRoute.length - 1)}rem` }}
        >
          <ListItemIcon>
            <Checkbox
              checked={isSelected}
              indeterminate={isIndeterminate}
              onChange={() => {
                selectNode(item);
              }}
            />
            {hasChildren && (
              <div onClick={() => toggleNode(item)} className={styles.iconWrap}>
                <div>
                  {isExpanded ? (
                    <ArrowDropDownIcon className={styles.arrowIcon} />
                  ) : (
                    <ArrowRightIcon className={styles.arrowIcon} />
                  )}
                </div>
                <div>
                  <FolderIcon className={styles.folder} />
                </div>
              </div>
            )}
          </ListItemIcon>
          <ListItemText primary={item.title} />
        </ListItem>
      </div>
    );
  };

  return (
    // 虚拟列表
    <Box sx={{ width: "100%", height: 500 }}>
      <FixedSizeList
        height={500}
        itemCount={
          isSearch
            ? searchDisplayTreeData.length
            : displayFlatUpdateTreeData.length
        }
        itemSize={46}
        width={360}
      >
        {renderListItem}
      </FixedSizeList>
    </Box>
  );
});
```

### hook

```ts
import { clone } from "ramda";
import { useEffect, useMemo, useState } from "react";
import { TreeNode } from "../add-users-model/props";

export const useAction = (
  treeData: TreeNode[],
  searchValue: string,
  setSelectedData: (data: TreeNode[]) => void
) => {
  //平铺树结构，改为平铺数据
  const flattenTreeTotalList = (
    tree: TreeNode[],
    parentIdRoute: number[] = []
  ): TreeNode[] => {
    let flattenedList: TreeNode[] = [];

    for (const node of tree) {
      const idRoute = [...parentIdRoute, node.id];

      flattenedList.push(node);

      node.children &&
        node.children.length > 0 &&
        flattenedList.push(...flattenTreeTotalList(node.children, idRoute));
    }

    return flattenedList;
  };

  //平铺后的总list
  const flatTreeTotalListData = flattenTreeTotalList(treeData);

  const [expandedNodes, setExpandedNodes] = useState<{
    displayExpandedNodes: Set<number>; //显示展开节点
    searchExpandedNodes: Set<number>; //搜索展开节点
  }>({ displayExpandedNodes: new Set(), searchExpandedNodes: new Set() });

  //选中节点
  const [selectedNodes, setSelectedNodes] = useState<Set<number>>(new Set());

  //半选节点
  const [indeterminateNodes, setIndeterminateNodes] = useState<Set<number>>(
    new Set()
  );

  //显示的list
  const [displayFlatUpdateTreeData, setDisplayFlatUpdateTreeData] = useState<
    TreeNode[]
  >(flatTreeTotalListData.filter((node) => node.idRoute.length === 1));

  //搜索的list
  const [searchDisplayTreeData, setSearchDisplayTreeData] = useState<
    TreeNode[]
  >([]);

  const isSearch = useMemo(
    () => searchDisplayTreeData.length > 0,
    [searchDisplayTreeData]
  );

  const getCurrentNodeListByCurrentIdRoute = (
    currentList: TreeNode[],
    currentIdRoute: number[]
  ) => {
    return {
      //获取全部子节点list包括节点本身
      allChildrenIncludeParentList: currentList.filter(
        ({ idRoute: nodeRoute }) =>
          currentIdRoute.every(
            (parentIdRoute, index) => parentIdRoute === nodeRoute[index]
          )
      ),
      //获取下一级子节点list
      nextLevelChildrenList: currentList.filter(
        ({ idRoute: nodeRoute }) =>
          currentIdRoute.every(
            (parentIdRoute, index) => parentIdRoute === nodeRoute[index]
          ) && nodeRoute.length === currentIdRoute.length + 1
      ),
      //获取全部父级节点list
      allParentList: currentList.filter(
        ({ idRoute: nodeRoute }) =>
          nodeRoute.length < currentIdRoute.length &&
          nodeRoute.every(
            (childIdRoute, index) => childIdRoute === currentIdRoute[index]
          )
      ),
    };
  };

  //根据展开插入或删除下一层节点
  const displayTreeList = (
    currentClickItem: TreeNode,
    nextLevelChildrenList: TreeNode[],
    isExpandingCurrentItem: boolean
  ): TreeNode[] => {
    if (isSearch) return searchDisplayTreeData;

    const displayList = clone(displayFlatUpdateTreeData);

    const parentRoute = currentClickItem.idRoute;

    const currentChildrenItem = nextLevelChildrenList;

    const currentTotalChildrenItem = getCurrentNodeListByCurrentIdRoute(
      displayList,
      parentRoute
    ).allChildrenIncludeParentList;

    const parentIndex = displayList.findIndex(
      (node) => currentClickItem.id === node.id
    );

    if (parentIndex !== -1) {
      if (isExpandingCurrentItem) {
        displayList.splice(parentIndex + 1, 0, ...currentChildrenItem);
      } else {
        displayList.splice(
          parentIndex + 1,
          currentTotalChildrenItem.length - 1
        );
      }
    }

    return displayList;
  };

  //搜索方法
  const handleSearchChange = (value: string) => {
    const targetSearchFilterList = flatTreeTotalListData.filter((item) => {
      return item.title.toLowerCase().includes(value.toLowerCase());
    });

    const idRouteList = [
      ...new Set(targetSearchFilterList.map(({ idRoute }) => idRoute).flat()),
    ];

    const displayData: TreeNode[] = idRouteList
      .map((nodeId) => flatTreeTotalListData.find(({ id }) => id === nodeId))
      .filter((item): item is TreeNode => !!item);

    if (value !== "") {
      setExpandedNodes((prevExpandedNodes) => ({
        ...prevExpandedNodes,
        searchExpandedNodes: new Set([
          ...prevExpandedNodes.searchExpandedNodes,
          ...idRouteList,
        ]),
      }));

      setSearchDisplayTreeData(displayData);
    } else {
      setExpandedNodes({
        displayExpandedNodes: expandedNodes.displayExpandedNodes,
        searchExpandedNodes: new Set(),
      });

      setSearchDisplayTreeData([]);
    }
  };

  //展开方法
  const toggleNode = (currentClickItem: TreeNode) => {
    const currentNodeId = currentClickItem.id;

    const newExpandedNodes = new Set(expandedNodes.displayExpandedNodes);

    const {
      allChildrenIncludeParentList: expendChildrenNodeList,
      nextLevelChildrenList: expendNextLevelChildrenList,
    } = getCurrentNodeListByCurrentIdRoute(
      flatTreeTotalListData,
      currentClickItem.idRoute
    );

    currentClickItem.childrenIdList = expendNextLevelChildrenList.map(
      ({ id }) => id
    );

    if (!isSearch)
      newExpandedNodes.has(currentNodeId)
        ? expendChildrenNodeList.forEach(({ id: nodeId }) => {
            newExpandedNodes.delete(nodeId);
          })
        : newExpandedNodes.add(currentNodeId);

    const currentListData = displayTreeList(
      currentClickItem,
      expendNextLevelChildrenList,
      newExpandedNodes.has(currentClickItem.id)
    );

    setExpandedNodes({
      displayExpandedNodes: newExpandedNodes,
      searchExpandedNodes: new Set(),
    });

    isSearch
      ? setSearchDisplayTreeData(currentListData)
      : setDisplayFlatUpdateTreeData(currentListData);
  };

  //选中方法
  const selectNode = (currentClickItem: TreeNode) => {
    const newSelectedNodes = new Set(selectedNodes);

    const newIndeterminateNode = new Set(indeterminateNodes);

    const conditioned = newSelectedNodes.has(currentClickItem.id);

    const currentRoute = currentClickItem.idRoute;

    const {
      allChildrenIncludeParentList: selectTotalItemList,
      allParentList: parentItemList,
    } = getCurrentNodeListByCurrentIdRoute(flatTreeTotalListData, currentRoute);

    selectTotalItemList.forEach(({ id: nodeId }) => {
      conditioned
        ? newSelectedNodes.delete(nodeId)
        : newSelectedNodes.add(nodeId);
      newIndeterminateNode.has(nodeId) && newIndeterminateNode.delete(nodeId);
    });

    parentItemList.forEach(({ id: nodeId }) => {
      conditioned
        ? newIndeterminateNode.delete(nodeId)
        : newIndeterminateNode.add(nodeId);
    });

    const parentIdRoute = currentRoute.slice(0, -1).reverse();

    parentIdRoute.forEach((parentId) => {
      const matchParentIdItem = flatTreeTotalListData.find(
        (item) => item.id === parentId
      );

      if (matchParentIdItem) {
        const { nextLevelChildrenList: expendNextLevelChildrenList } =
          getCurrentNodeListByCurrentIdRoute(
            flatTreeTotalListData,
            matchParentIdItem.idRoute
          );

        matchParentIdItem.childrenIdList = expendNextLevelChildrenList.map(
          ({ id }) => id
        );

        const allChildrenSelected = matchParentIdItem.childrenIdList.every(
          (childId) => newSelectedNodes.has(childId)
        );

        const allChildrenNotSelected = matchParentIdItem.childrenIdList.every(
          (childId) =>
            !newSelectedNodes.has(childId) && !newIndeterminateNode.has(childId)
        );

        if (allChildrenSelected) {
          newIndeterminateNode.delete(matchParentIdItem.id);
          newSelectedNodes.add(matchParentIdItem.id);
        } else {
          newSelectedNodes.delete(matchParentIdItem.id);
          !allChildrenNotSelected &&
            newIndeterminateNode.add(matchParentIdItem.id);
        }
      }
    });

    setSelectedNodes(newSelectedNodes);
    setIndeterminateNodes(newIndeterminateNode);
  };

  useEffect(() => {
    handleSearchChange(searchValue);

    setSelectedData(
      flatTreeTotalListData.filter(
        (item) => selectedNodes.has(item.id) && item.children.length === 0
      )
    );
  }, [searchValue, selectedNodes]);

  return {
    isSearch,
    searchDisplayTreeData,
    displayFlatUpdateTreeData,
    selectedNodes,
    expandedNodes,
    indeterminateNodes,
    selectNode,
    toggleNode,
    handleSearchChange,
    flatTreeTotalListData,
  };
};
```

## component

### index 应用

```ts
import { useRef, useState } from "react";
import { TreeNode } from "./props";
import { TreeSelectRef } from "../tree-select/props";

export const useAction = () => {
  const treeData: TreeNode[] = [];

  const [searchValue, setSearchValue] = useState<string>("");

  const treeSelectRef = useRef<TreeSelectRef>(null);

  const [alreadySelectData, setAlreadySelectData] = useState<TreeNode[]>([]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  return {
    treeData,
    searchValue,
    handleSearchChange,
    treeSelectRef,
    alreadySelectData,
    setAlreadySelectData,
  };
};
```

### hook.ts

```ts
import { Button, TextField } from "@mui/material";
import styles from "./index.module.scss";
import CloseIcon from "@mui/icons-material/Close";
import { useAction } from "./hook";
import { ModalBoxRef } from "../../../../dtos/modal";
import { RefObject } from "react";
import { TreeNode } from "./props";
import { TreeSelectList } from "../tree-select";

export const AddUsersModel = (props: {
  addUsersRef: RefObject<ModalBoxRef>;
}) => {
  const { addUsersRef } = props;

  const {
    treeData,
    searchValue,
    handleSearchChange,
    treeSelectRef,
    alreadySelectData,
    setAlreadySelectData,
  } = useAction();

  return (
    <div className={styles.modelWrap}>
      <div className={styles.leftGroupBox}>
        <TextField
          sx={{
            input: {
              height: "1.5rem",
              paddingX: ".5rem",
              paddingY: ".15rem",
              borderColor: "grey.500",
              fontSize: "0.6rem",
              lineHeight: "0.625rem",
            },
          }}
          type="search"
          className={styles.search}
          placeholder="搜索"
          size="small"
          onChange={handleSearchChange}
          value={searchValue}
        />
        <div>
          <div className={styles.listTitle}>OPERATION INC.</div>
          <TreeSelectList
            ref={treeSelectRef}
            setSelectedData={(selectItems) => setAlreadySelectData(selectItems)}
            treeData={treeData}
            searchValue={searchValue}
          />
        </div>
      </div>
      <div className={styles.rightGroupBox}>
        <div className={styles.countBox}>
          <div className={styles.selectTitleWrap}>
            <div>已選{alreadySelectData.length}個用戶</div>
            <CloseIcon
              className={styles.cancel}
              onClick={() => addUsersRef.current?.close()}
            />
          </div>
          <div className={styles.selectItemsBox}>
            {alreadySelectData.map((selectItems: TreeNode) => {
              return (
                <div className={styles.selectListWrap} key={selectItems.id}>
                  <div>{selectItems.title}</div>
                  <CloseIcon
                    className={styles.delete}
                    onClick={() =>
                      treeSelectRef.current?.selectNode(selectItems)
                    }
                  />
                </div>
              );
            })}
          </div>
        </div>
        <div className={styles.buttonBox}>
          <Button variant="contained" className={styles.button}>
            確認
          </Button>
          <Button
            variant="outlined"
            className={styles.button}
            onClick={() => addUsersRef.current?.close()}
          >
            取消
          </Button>
        </div>
      </div>
    </div>
  );
};
```
