# 文档对象模型（DOM）

## 真实 DOM

- 浏览器将 HTML 或 XML 文档解析成树状结构的方式

- 每个 HTML 标签和它们的内容都被表示为一个节点，节点之间形成了层次结构

- JavaScript 可以通过操作这些节点来实现对文档的交互和操作, 动态地添加、删除、修改 HTML 元素，从而改变页面的外观和行为,每次对 DOM 进行更改时，浏览器都会重新计算并重新渲染整个页面，可能导致性能问题，特别是在大型和复杂的应用程序中

## 虚拟 DOM 的概念

React 引入的一个概念，旨在优化 DOM 操作，提高应用程序的性能和响应性

- **基本思想：** 在内存中构建一个轻量级的、虚拟的 DOM 树，与实际的 DOM 结构相对应,当数据发生变化时，先比较新旧虚拟 DOM 树的差异，然后只更新实际需要改变的部分，最终才将这些变化应用到实际的 DOM 中

- 通过比较变化生成最小化的 DOM 操作，优化性能、提升用户体验。在 React 中使用 JSX 语法描述虚拟 DOM，是关键概念

## 虚拟 DOM 和真实 DOM 的区别

- 两者结构对比

```ts
const VDOM = React.createElement("div", {}, "虚拟DOM");
const DOM = document.createElement("div");
DOM.innerHTML = "真实DOM";
console.log(`虚拟DOM：`, VDOM);
console.log(`真实DOM：`, DOM);
```

- 虚拟 DOM 是一个对象的结构

```ts
"虚拟DOM：", {
  $$typeof: [object Symbol] { ... },
  _owner: null,
  _store: { ... },
  key: null,
  props: {
    children: "虚拟DOM"
  },
  ref: null,
  type: "div"
}
```

- 真实的 DOM 是一个 dom 的结构

```ts
<div>真实DOM</div>
```

真实的 DOM 结构挂载了很多方法，其中一节截图：

![真实DOM](image-2.png)

## 虚拟 DOM 的好处

- **性能优化**：相对于直接操作实际 DOM，虚拟 DOM 的更新速度更快

- **减少重绘和回流**：更新策略可以最小化浏览器的重绘（repaint）和回流（reflow）操作，从而减少页面闪烁和性能瓶颈

- **简化复杂性**： 使得开发者可以更专注于应用程序的逻辑，帮助开发者更轻松地构建高性能的用户界面

### DOM 操作和重新渲染的性能问题可能会导致以下影响

1. **性能下降**：频繁的 DOM 操作和重新渲染会占用大量的 CPU 资源，导致页面响应变慢

2. **页面闪烁**：重新渲染可能导致页面的闪烁，因为在重新渲染期间，页面上的元素可能会短暂地消失或重新排列

3. **布局抖动**：DOM 操作可能导致布局抖动，即页面的布局反复变化，可能会导致页面上的元素跳动或改变位置

4. **能源消耗**：频繁的重新渲染和 DOM 操作会增加设备的能源消耗

## 通过以下步骤实现虚拟 DOM

1. **组件的渲染**：当组件被渲染时，会返回一个描述组件 UI 的虚拟 DOM 元素

2. **虚拟 DOM 的创建**：将 JSX 代码或 React.createElement 函数调用转换为一个虚拟 DOM 对象

3. **虚拟 DOM 树的构建**：将所有组件的虚拟 DOM 元素构建成一个树状结构（ 虚拟 DOM 树：在内存中存在的，不涉及实际的 DOM 操作 ）

4. **首次渲染**：在首次渲染时，将虚拟 DOM 树转换为实际的 DOM 元素，并将其插入到页面中

5. **组件状态变化**：当组件的状态（state）发生变化，或者接收到新的属性（props），组件会重新渲染。在重新渲染之前，会生成一个新的虚拟 DOM 树，描述组件最新的 UI 状态

6. **虚拟 DOM 比较**：通过比较不同树之间的节点来最小化实际 DOM 操作

7. **DOM 更新**：完成比较后，需要更新实际 DOM 的操作，描述了从旧 DOM 状态到新 DOM 状态的变化，尽量合并和优化这些操作，以减少 DOM 操作的数量

8. **实际 DOM 更新**：批量处理，以最小化实际 DOM 操作的成本

## Diff 算法

- 组件并不是真实的 DOM 节点，而是存在于内存之中的一种数据结构,虚拟 DOM，只有当它插入文档以后，才会变成真实的 DOM
- React 的设计，所有的 DOM 变动，都先在虚拟 DOM 上发生，然后再将实际发生变动的部分，反映在真实 DOM 上，这种算法 DOM diff

## **Tree Diff (树差异)**

React 只会对相同层级的 DOM 节点进行比较，即同一个父节点下的所有子节点，当发现节点已经不存在时，则该节点及其子节点会被完全删除掉，只对树进行一次遍历，便能完成整个 DOM 树的比较

- 整个处理过程（ 对于不同层级的节点，只有创建和删除操作 ）
  假设 A 节点(包括其子节点)整个被移动到 D 节点下，当根节点发现子节点中 A 消失了，就会直接销毁 A;当 D 发现多了一个子节点 A，则会创建新的 A(包括子节点)作为其子节点

  **diff 的执行情况:** 创建 A → 创建 B → 创建 C → 删除 A

  ![Tree diff](image.png) ![Tree diff delete](image-1.png)

## **Component Diff (组件差异)**

- 同一类型的组件，按照原策略继续比较 Virtual DOM 树

- 如果不是，则将该组件判断为 dirty component，从而替换整个组件下的所有子节点

- 对于同一类型的组件，有可能其 Virtual DOM 没有任何变化，如果确切知道，可以节省大量的 diff 运算时间，React 允许用户通过 shouldComponentUpdate()来判断该组件是否需进行 diff 算法分析，如果调用了 forceUpdate 方法，shouldComponentUpdate 则失效

- 整个处理过程
  当组件 D 变为组件 G 时，即使这两个组件结构相似，一旦 React 判断 D 和 G 是不同类型的组件，不会比较二者的结构，而是直接删除组件 D，重新创建组件 G 及其子节点

## **Element Diff (元素差异)**

当节点处于同一层级时，diff 提供了 3 种节点操作

1. **INSERT_MARKUP（ 插入 ）**: 新的组件类型不在旧集合里，即全新的节点，需要对新节点执行插入操作

2. **MOVE_EXISTING （ 移动 ）**: 旧集合中有新组件类型，且 element 是可更新的类型，generateComponentChildren 已调用 receiveComponent ，这种情况下 prevChild=nextChild ，就需要做移动操作，可以复用以前的 DOM 节点

3. **REMOVE_NODE （ 删除 ）**: 旧组件类型，在新集合里也有，但对应的 element 不同则不能直接复用和更新，需要执行删除操作，或者旧组件不在新集合里的，也需要执行删除操作

- 整个处理过程

  旧的集合中包含节点 A、B、C 和 D
  新的集合中包含节点 B、A、D 和 C
  新旧集合 diff 差异化对比，则 B!=A，则创建并插入 B 至新集合，删除旧集合 A， 以此类推，创建并插入 A、D 和 C，删除 B、C 和 D

- 相同的节点，仅是位置发生了变化，需要进行繁杂低效的删除、创建操作，优化策略：允许对同一层级的同组子节点，添加唯一 key 进行区分

## 总结

- **Tree Diff**：用于比较虚拟 DOM 树之间的差异，以最小化实际 DOM 操作
- **Component Diff**：应用于组件级别，用于确定在组件更新时需要重新渲染的部分
- **Element Diff**：是树差异的一部分，用于比较单个元素的差异