# ref

- **创建 ref 并传递**

```ts
// 组件 props 接口
interface ComponentProps {
  // ...
}

// 创建 ref
const componentRef = useRef<ComponentRef>(null);

// 传递给组件
<Component ref={componentRef} />;
```

- **组件内获取 ref**

```ts
// 组件接口
export interface ComponentRef {
  method: () => void;
}

// 组件实现
const Component = forwardRef<ComponentRef, ComponentProps>(
  (props: ComponentProps, ref: ForwardedRef<ComponentRef>) => {
    useImperativeHandle(ref, () => ({
      method() {
        // ...
      },
    }));

    return <div>Component</div>;
  }
);
```

- **调用方法**

```ts
componentRef.current.method();
```

- **传递属性**

```ts
// 接口定义属性
interface ComponentProps {
  prop: string;
}

// 使用组件时传属性
<Component ref={componentRef} prop={value} />;

// 组件内获取属性
const Component = forwardRef<ComponentRef, ComponentProps>(
  (props: ComponentProps, ref: ForwardedRef<ComponentRef>) => {
    const { prop } = props;

    // ...
  }
);
```

## 结合 ref 实现 antd 弹窗

```ts
// modal.tsx

import { Modal } from "antd";
import { forwardRef, useImperativeHandle } from "react";

export interface ModalProps {
  title: string;
  content: React.ReactNode;
}

export interface ModalHandlesRef {
  open: () => void;
  close: () => void;
}

export const MyModal = forwardRef<ModalHandlesRef, ModalProps>((props, ref) => {
  const [visible, setVisible] = useState(false);

  useImperativeHandle(ref, () => ({
    open: () => {
      setVisible(true);
    },
    close: () => {
      setVisible(false);
    },
  }));

  return (
    <Modal
      title={props.title}
      visible={visible}
      onOk={() => setVisible(false)}
      onCancel={() => setVisible(false)}
    >
      {props.content}
    </Modal>
  );
});

// 使用
const modalRef = useRef<ModalHandlesRef>(null);

<MyModal ref={modalRef} title="Modal Title" content={<div>内容组件</div>} />;

// 调用方法
modalRef.current.open();
modalRef.current.close();
```
