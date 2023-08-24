# Ref

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

## 实现 antd 弹窗的模版

```ts
// ModalBox.tsx
import { forwardRef, useImperativeHandle } from "react";
import { Modal } from "antd";

interface ModalBoxProps {
  width?: number;
  contents: React.ReactNode;
}

export interface ModalBoxRef {
  open: () => void;
  close: () => void;
}

const ModalBox = forwardRef<ModalBoxRef, ModalBoxProps>(
  (props: ModalBoxProps, ref: React.ForwardedRef<ModalBoxRef>) => {
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
        mask
        maskClosable={false}
        centered
        destroyOnClose
        open={visible}
        onOk={() => setVisible(false)}
        onCancel={() => setVisible(false)}
        width={props.width}
        footer={null}
        closable={false}
      >
        {props.contents}
      </Modal>
    );
  }
);

export default ModalBox;
```

```ts
// Home.tsx

import { useRef } from "react";
import { Button } from "antd";

import ModalBox, { ModalBoxRef } from "./ModalBox";

const Home = () => {
  const modalRef = useRef<ModalBoxRef>(null);

  return (
    <>
      <Button onClick={() => modalRef.current?.open()}>Open Modal</Button>

      <ModalBox ref={modalRef} width={/* ... */} contents={/* ... */} />
    </>
  );
};

export default Home;
```

```ts
// contents组件
export const ContentsModel = (props: {
  alreadyCallRef: RefObject<IModalBoxRef>;
}) => {
  const { alreadyCallRef } = props;

  return <Button onClick={() => alreadyCallRef.current?.close()}>关闭</Button>;
};
```

## 结合 ref 实现 antd 弹窗的例子

```ts
// home.tsx
import { Button } from "antd";
import { useRef } from "react";

import { IModalBoxRef, ModalBox } from "@/components/model";

import { CallModel } from "../call-model";

export const Home = () => {
  const alreadyCallRef = useRef<IModalBoxRef>(null);

  return (
    <>
      <Button onClick={() => alreadyCallRef.current?.open()}>
        查看已经接听的号码
      </Button>
      <ModalBox
        ref={alreadyCallRef}
        width={1300}
        contents={<CallModel alreadyCallRef={alreadyCallRef} />}
      />
    </>
  );
};
```

```ts
// model.tsx
import { Modal } from "antd";
import { forwardRef, useImperativeHandle, useState } from "react";

interface IModalBoxProps {
  contents: React.ReactNode;
  width?: number;
}

export interface IModalBoxRef {
  open: () => void;
  close: () => void;
}

export const ModalBox = forwardRef<IModalBoxRef, IModalBoxProps>(
  (props: IModalBoxProps, ref: React.ForwardedRef<IModalBoxRef>) => {
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

```ts
// content.tsx
import { Button } from "antd";
import { RefObject } from "react";

import { IModalBoxRef } from "@/components/model";

export const CallModel = (props: {
  alreadyCallRef: RefObject<IModalBoxRef>;
}) => {
  const { alreadyCallRef } = props;

  return (
    <div className="flex flex-col w-[78rem]">
      <div className="flex justify-center">
        <div className="w-[18rem] text-center flex justify-center">
          已CALL号码
        </div>
        <div className="w-[20rem] text-center">接听时间段</div>
        <div className="w-[15rem] text-center">接听时间点</div>
        <div className="w-[25rem]">接听时长</div>
      </div>
      <div className="flex justify-center">
        <div className="w-[18rem] text-center flex justify-center">
          408-500-9922
        </div>
        <div className="w-[55rem] flex">
          <div className="w-[20rem] text-center"> 时间1 --- 时间2</div>
          <div className="w-[15rem] text-center">接听时间</div>
          <div className="w-[10rem]">接听时长</div>
          <div className="w-[10rem]">
            <Button>录音</Button>
          </div>
        </div>
        <div className="w-[5rem]">
          <Button>导出</Button>
        </div>
      </div>
      <Button
        className="w-[5rem]"
        onClick={() => alreadyCallRef.current?.close()}
      >
        关闭
      </Button>
    </div>
  );
};
```
