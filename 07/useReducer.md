# useReducer

useReducer 用于管理具有复杂状态和交互逻辑的组件状态。它接收一个 reducer 函数和初始状态作为参数，并返回当前状态和一个 dispatch 函数。

三个参数：reducer 函数和初始状态还有可选 init

1. reducer 函数：reducer 函数是一个纯函数，接受当前的状态（state）和一个动作（action）作为参数，并返回一个新的状态。它用于根据传入的动作类型来更新状态。

2. 初始状态（state）：初始状态是组件的初始状态值。可以是一个简单的值（如字符串、数字等），也可以是一个复杂的对象。初始状态在组件首次渲染时被初始化，并且在使用 useReducer 时是不可变的。

3. 可选 init：返回初始状态的初始化函数。如果未指定，则初始状态设置为 initialArg。否则，初始状态设置为调用 init(initialArg)的结果

在使用 useReducer 时，dispatch 函数是用于触发 reducer 函数执行的函数。它的主要作用是向 reducer 函数传递一个动作对象，从而根据动作类型来更新状态。
dispatch 函数的定义如下：`dispatch(action);`

使用 dispatch 函数时，会触发 reducer 函数的执行，并根据传入的 action 类型来更新状态。reducer 函数在执行时会根据不同的 action 类型，执行相应的逻辑，并返回新的状态。然后，useReducer 会将新的状态值更新到组件中，并重新渲染组件。
通过 dispatch 函数，可以在组件中发起各种 action，例如更新状态、添加数据、删除数据等。dispatch 函数的调用会触发 reducer 函数的执行，从而实现对状态的更新和管理。
dispatch 函数的主要作用是向 reducer 函数传递一个动作对象，从而触发状态的更新和管理。它是 useReducer 的核心函数，用于实现组件状态的交互逻辑。

- 定义 reducer 函数，它接收当前状态和一个 action 对象作为参数，并根据 action 的类型更新状态。reducer 函数需要返回一个新的状态。

通过调用 dispatch 函数并传入一个 action 对象来更新状态。reducer 函数根据 action 的类型来更新状态，然后返回新的状态。组件重新渲染时，会显示更新后的状态。
