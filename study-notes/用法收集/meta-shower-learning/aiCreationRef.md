# pop up 弹窗 Ref

创建 ref 赋值为 aiCreationRef

```ts
const aiCreationRef = useRef<ModalBoxRef>(null);
```

指定 ref 为 JSX 属性，将其向下传递给

```ts
<ModalBox
  ref={aiCreationRef}
  width={1600}
  title={"新建制作"}
  contents={<AICopyCreation aiCreationRef={aiCreationRef} />}
/>
```

React 传递 ref 给 forwardRef 内函数 (props, ref) => ...，作为其第二个参数

```ts
interface ModalBoxProps {
  title: string;
  contents: React.ReactNode;
  width?: number;
}

export interface ModalBoxRef {
  open: () => void;
  close: () => void;
}

export const ModalBox = forwardRef<ModalBoxRef, ModalBoxProps>(
  (props: ModalBoxProps, ref: React.ForwardedRef<ModalBoxRef>) => {
    const [open, setOpen] = useState<boolean>(false);

    useImperativeHandle(ref, () => ({
      open: () => {
        setOpen(true);
      },
      close: () => {
        setOpen(false);
      },
    }));

    return (
      <Modal
        mask
        maskClosable={false}
        title={<div className="text-xl">{props.title}</div>}
        centered
        destroyOnClose={true}
        open={open}
        onOk={() => setOpen(false)}
        onCancel={() => setOpen(false)}
        width={props.width}
        footer={false}
        closable={false}
      >
        {props.contents}
      </Modal>
    );
  }
);
```

当 ref 挂载完成，ref.current 将指向其 DOM 节点

```ts
export interface AICopyCreationProps {
  aiCreationRef: RefObject<ModalBoxRef>;
}
```

```ts
export const AICopyCreation = (props: AICopyCreationProps) => {
  const { inputTitle, inputContext, navigate } = useAction();

  const { aiCreationRef } = props;

  return (
    <div className="flex flex-col text-base">
      <div className="flex justify-end my-2">
        <Button
          className="mx-8 text-sm"
          onClick={() => aiCreationRef.current?.close()}
        >
          取消
        </Button>
        <Button
          onClick={() => {
            setTitle(inputTitle);
            setContext(inputContext);
            navigate("/digitalBroadcasting");
            aiCreationRef.current?.close();
          }}
        >
          下一步
        </Button>
      </div>
    </div>
  );
};
```
