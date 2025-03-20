# tree

```tsx
import { CloseOutlined, SearchOutlined } from "@ant-design/icons";
import { Input, Tree } from "antd";
import { SetStateAction } from "react";

import { CustomModal } from "@/pages/approval-center/components/custom-modal";
import {
  IOrganizationTreeNode,
  OrganizationTreeType,
} from "@/types/approval/approval-flow";

import {
  IApoolFlowOperateTypeEnum,
  ITreeModelOperateTypeEnum,
} from "../../props";
import { NoneTree } from "../none-tree";
import { useAction } from "./hook";
import styles from "./index.module.less";
import { ITreeSelectNode } from "./props";

export const TreeSelectModal = ({
  setIsOpenTreeModal,
  isOpenTreeModal,
  setSelectMembers,
  selectMembers,
  orgTree,
  isRulePerson,
  ruleMembers,
  setRuleMembers,
  operateType,
  tree,
}: {
  setIsOpenTreeModal: (value: SetStateAction<boolean>) => void;
  isOpenTreeModal: boolean;
  setSelectMembers: (value: SetStateAction<ITreeSelectNode[]>) => void;
  selectMembers: ITreeSelectNode[];
  orgTree: ITreeSelectNode[];
  isRulePerson: ITreeModelOperateTypeEnum;
  ruleMembers: ITreeSelectNode[];
  setRuleMembers: (value: SetStateAction<ITreeSelectNode[]>) => void;
  operateType: IApoolFlowOperateTypeEnum;
  tree: IOrganizationTreeNode[];
}) => {
  const {
    expandedKeys,
    autoExpandParent,
    checkedKeys,
    onExpand,
    onCheck,
    onChange,
    findAllEmployees,
  } = useAction({ selectMembers, orgTree, isRulePerson, ruleMembers });

  return (
    <CustomModal
      className="customDeviceModal"
      title={
        <div className={styles.modalTitle}>
          選擇成員
          <CloseOutlined
            className={styles.closeOutlined}
            onClick={() => setIsOpenTreeModal(false)}
          />
        </div>
      }
      open={isOpenTreeModal}
      modalWidth="560px"
      footer={false}
      mask={false}
    >
      <div>
        <div className={styles.boxContentWrap}>
          <div className={styles.selectBox}>
            <Input
              prefix={<SearchOutlined style={{ color: "#A2A2B1" }} />}
              style={{ marginBottom: 8 }}
              onChange={onChange}
              bordered={false}
              placeholder="搜索"
            />
            <Tree
              onExpand={onExpand}
              expandedKeys={expandedKeys}
              autoExpandParent={autoExpandParent}
              treeData={orgTree}
              checkable
              className={styles.treeSelect}
              onCheck={(_, { checkedNodes }) =>
                operateType !== IApoolFlowOperateTypeEnum.IsVisible &&
                onCheck({
                  checkedNodes,
                })
              }
              checkedKeys={checkedKeys?.map((item) => item.key)}
            />
          </div>
          <div className={styles.selectBox}>
            <div className={styles.alreadySelectTitle}>已選擇成員</div>

            {checkedKeys.length > 0 ? (
              <div className={styles.alreadySelectItemBox}>
                <NoneTree
                  tree={tree}
                  selectMembers={checkedKeys
                    .filter(
                      (item) => item.type === OrganizationTreeType.Employee
                    )
                    .map((item) => item.key)}
                />
              </div>
            ) : (
              <div className={styles.noSelectItemBox}>暫無數據</div>
            )}
          </div>
        </div>
        <div className={styles.modalEndFooter}>
          <div
            className={styles.cancelButton}
            onClick={() => setIsOpenTreeModal(false)}
          >
            取消
          </div>
          <div
            className={styles.confirmButton}
            onClick={() => {
              setIsOpenTreeModal(false);
              isRulePerson === ITreeModelOperateTypeEnum.IsAddPerson &&
                setSelectMembers(findAllEmployees(checkedKeys));
              isRulePerson === ITreeModelOperateTypeEnum.IsRulePerson &&
                setRuleMembers(findAllEmployees(checkedKeys));
            }}
          >
            確認
          </div>
        </div>
      </div>
    </CustomModal>
  );
};
```

```tsx
import { useEffect, useState } from "react";

import { OrganizationTreeType } from "@/types/approval/approval-flow";

import { ITreeModelOperateTypeEnum } from "../../props";
import { ITreeSelectNode } from "./props";

export const useAction = ({
  selectMembers,
  orgTree,
  isRulePerson,
  ruleMembers,
}: {
  selectMembers: ITreeSelectNode[];
  orgTree: ITreeSelectNode[];
  isRulePerson: ITreeModelOperateTypeEnum;
  ruleMembers: ITreeSelectNode[];
}) => {
  const [expandedKeys, setExpandedKeys] = useState<React.Key[]>([]);

  const [autoExpandParent, setAutoExpandParent] = useState<boolean>(true);

  const [checkedKeys, setCheckedKeys] = useState<ITreeSelectNode[]>([]);

  const onExpand = (newExpandedKeys: React.Key[]) => {
    setExpandedKeys(newExpandedKeys);
    setAutoExpandParent(false);
  };

  const onCheck = ({ checkedNodes }: { checkedNodes: ITreeSelectNode[] }) => {
    setCheckedKeys(checkedNodes);
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    if (!value) {
      setExpandedKeys([]);
      setAutoExpandParent(false);

      return;
    }

    const filteredKeys: React.Key[] = [];

    const filterTree = (data: ITreeSelectNode[]) => {
      for (let i = 0; i < data.length; i++) {
        const node = data[i];

        const nodeTitle = String(node.title);

        if (nodeTitle.toLowerCase().includes(value.toLowerCase())) {
          filteredKeys.push(node.key);
        }

        if (node.children) {
          filterTree(node.children);
        }
      }
    };

    filterTree(orgTree);

    setExpandedKeys(filteredKeys);
    setAutoExpandParent(true);
  };

  const onCloseClick = (itemKey: ITreeSelectNode) => {
    const newCheckedKeys = checkedKeys.filter(
      (item) => item.key !== itemKey.key
    );

    setCheckedKeys(newCheckedKeys);
  };

  const findAllEmployees = (nodes: ITreeSelectNode[]): ITreeSelectNode[] => {
    const employees: ITreeSelectNode[] = [];

    const visitedKeys: Set<string> = new Set();

    const traverse = (node: ITreeSelectNode) => {
      if (
        node.type === OrganizationTreeType.Employee &&
        !visitedKeys.has(node.key)
      ) {
        employees.push(node);
        visitedKeys.add(node.key);
      }

      if (node.children && node.children.length > 0) {
        for (const child of node.children) {
          traverse(child);
        }
      }
    };

    for (const node of nodes) {
      traverse(node);
    }

    return employees;
  };

  useEffect(() => {
    if (selectMembers === undefined) {
      setCheckedKeys([]);
    } else if (isRulePerson === ITreeModelOperateTypeEnum.IsAddPerson) {
      setCheckedKeys(selectMembers);
    }
  }, [selectMembers, isRulePerson]);

  useEffect(() => {
    if (isRulePerson === ITreeModelOperateTypeEnum.IsRulePerson)
      setCheckedKeys(ruleMembers);
  }, [ruleMembers, isRulePerson]);

  return {
    expandedKeys,
    autoExpandParent,
    checkedKeys,
    onExpand,
    onCheck,
    onChange,
    onCloseClick,
    setCheckedKeys,
    findAllEmployees,
  };
};
```
