# 简介

## Vue

​	Vue是一款用于构建用户界面的 JavaScript框架。基于标准 HTML、CSS 和 JavaScript 构建。

```
<div id="app">
  <button @click="count++">
    Count is: {{ count }}
  </button>
</div>

import { createApp } from 'vue'

createApp({
  data() {
    return {
      count: 0
    }
  }
}).mount('#app')

```



##### Vue的两个核心功能

- 声明式渲染：通过模板语法，告诉浏览器什么地方要渲染什么数据

- 响应性：Vue 会自动跟踪 JavaScript 状态并在其发生变化时响应式地更新 DOM。

  ​				大概就相当于用户更新数据的时候，数据就会自动更新。

单文件组件（.vue）：逻辑（JavaScript）+ 模板(HTML) + 样式(CSS) 封装在一个文件里



##### API风格

- 选项式API：选项所定义的属性都会暴露在函数内部的 `this` 上，它会指向当前的组件实例。

```
<script>
export default {
  // data() 返回的属性将会成为响应式的状态
  // 并且暴露在 `this` 上
  data() {
    return {
      count: 0
    }
  },

  // methods 是一些用来更改状态与触发更新的函数
  // 它们可以在模板中作为事件监听器绑定
  methods: {
    increment() {
      this.count++
    }
  },

  // 生命周期钩子会在组件生命周期的各个不同阶段被调用
  // 例如这个函数就会在组件挂载完成后被调用
  mounted() {
    console.log(`The initial count is ${this.count}.`)
  }
}
</script>

<template>
  <button @click="increment">Count is: {{ count }}</button>
</template>

```

- 组合式API：一般与<script setup> 搭配使用；

```
<script setup>
 // `setup` 是一个专门用于组合式 API 的特殊钩子函数
import { ref, onMounted } from 'vue'

// 响应式状态
const count = ref(0)

// 用来修改状态、触发更新的函数
function increment() {
  count.value++
}

// 生命周期钩子
onMounted(() => {
  console.log(`The initial count is ${count.value}.`)
})
</script>

<template>
  <button @click="increment">Count is: {{ count }}</button>
</template>

```



##### 创建一个应用

- 通过[`createApp`](https://cn.vuejs.org/api/application.html#createapp) 函数创建一个新的 **应用实例**

- 挂载应用：应用实例必须在调用了 `.mount()` 方法后才会渲染出来。

  ​				`.mount()` 方法应该始终在整个应用配置和资源注册完成后被调用。

```
<div id="app"></div>
app.mount('#app')
```

# 基础

## 模板语法

- **文本插值**（可以数据绑定） **{{ }}**

```
<span>Message: {{ msg }}</span>
```

- **原始HTML**(用**v-html**指令)

```
<p>Using text interpolation: {{ rawHtml }}</p>
<p>Using v-html directive: <span v-html="rawHtml"></span></p>

Using text interpolation: <span style="color: red">This should be red.</span>
Using v-html directive: This should be red.
```

- **Attribute 绑定** （**v-bind**指令 / :id）；`v-bind` 指令指示 Vue 将元素的 `id` attribute 与组件的 `dynamicId` 属性保持一致。

```
<div v-bind:id="dynamicId"></div>
<div :id="dynamicId"></div>
```

- **布尔型 Attribute** : 依据 true / false 值来决定 attribute 是否应该存在于该元素上

```
<button :disabled="isButtonDisabled">Button</button>
//如果 isButtonDisabled 为真知或空字符串，则button有disabled属性；反之，则忽略
```

- **动态绑定多个值** （包含多个属性的javaScript对象，通过 **v-bind ** 绑定到单个元素上）

```
const objectOfAttrs = {
  id: 'container',
  class: 'wrapper'
}
<div v-bind="objectOfAttrs"></div>
```

##### 指令 Directives 

- 参数 Arguments ：某些指令会需要一个“参数”，在指令名后通过一个冒号隔开做标识。

```
<a v-bind:href="url"> ... </a>

<!-- 简写 -->
<a :href="url"> ... </a>
这里 href 就是一个参数，它告诉 v-bind 指令将表达式 url 的值绑定到元素的 href attribute 上。
```

- 修饰符 Modifiers ：以点开头的特殊后缀，表明指令需要以一些特殊的方式被绑定。

```
<form @submit.prevent="onSubmit">...</form>
.prevent 修饰符会告知 v-on 指令对触发的事件调用 event.preventDefault()
```



## 响应式基础

#### **声明响应式状态**（reactive()）

- 使用 [`reactive()`](https://cn.vuejs.org/api/reactivity-core.html#reactive) 函数创建一个响应式对象或数组
- `reactive()` 返回的是一个原始对象的 [Proxy](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy)，它和原始对象是不相等的
- `reactive()` 的局限性 ：仅对对象类型有效（对象、数组和 `Map`、`Set` 这样的[集合类型](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects#使用键的集合对象)），而对 `string`、`number` 和 `boolean` 这样的 [原始类型](https://developer.mozilla.org/zh-CN/docs/Glossary/Primitive) 无效。

```
<script setup>
import { reactive } from 'vue'

const state = reactive({ count: 0 })

function increment() {
  state.count++
}
</script>

<template>
  <button @click="increment">
    {{ state.count }}
  </button>
</template>

```

#### 用 `ref()` 定义响应式变量 

- `ref()` 将传入参数的值包装为一个带 `.value` 属性的 ref 对象
- ref 的 `.value` 属性也是响应式的
- 在模板中解包（ref 是模板渲染上下文的顶层属性时才适用自动“解包”）

```
<script setup>
import { ref } from 'vue'

const count = ref(0)

function increment() {
  count.value++
}
</script>

<template>
  <button @click="increment">
    {{ count }} <!-- 无需 .value -->
  </button>
</template>

```

## 计算属性

##### const  a = computed()=>{} 

- 用computed()=>{}来计算，返回一个属性值

- 计算属性来描述依赖响应式状态的复杂逻辑

- 计算属性值会基于其响应式依赖被缓存

  

## 类与样式绑定

#### 绑定 HTML class 

- ##### 绑定对象

`:class` (`v-bind:class` 的缩写)传递一个对象来动态切换 class

```
<div :class="{ active: isActive }"></div>
active 是否存在取决于数据属性 isActive 的真假值
```

- ##### 绑定数组

```
const activeClass = ref('active')
const errorClass = ref('text-danger')
<div :class="[activeClass, errorClass]"></div>
//渲染结果
<div class="active text-danger"></div>
```

#### 绑定内联样式 

- ##### 绑定对象  `:style`

## 条件渲染 

- **v-if**   /   **v-else**   /   **v-else-if**   :   只会在指令返回true时才被渲染

- **v-show**   :   按条件显示一个元素;会在 DOM 渲染中保留该元素；仅切换了该元素上名为 `display` 的 CSS 属性

- 同一个节点上时，**v-if**   优先级高于   **v-for**

  ```
  //在外新包装一层 <template> 再在其上使用 v-for 可以解决这个问题 
  <template v-for="todo in todos">
    <li v-if="!todo.isComplete">
      {{ todo.name }}
    </li>
  </template>
  ```

  

## 列表渲染  v-for

#### v-for列表

- 基于一个数组渲染一个列表
- `item in items` 形式的特殊语法，其中 `items` 是源数据的数组，而 `item` 是迭代项的**别名**

```
const items = ref([{ message: 'Foo' }, { message: 'Bar' }])

<li v-for="item in items">
  {{ item.message }}
</li>

<li v-for="(item, index) in items">
  {{ parentMessage }} - {{ index }} - {{ item.message }}
</li>
```

#### v-for对象

- 遍历对象属性（value属性值 ，key属性名 ， index位置索引）

```
const myObject = reactive({
  title: 'How to do lists in Vue',
  author: 'Jane Doe',
  publishedAt: '2016-04-10'
})

<li v-for="(value, key, index) in myObject">
  {{ index }}. {{ key }}: {{ value }}
</li>
```

**在 `v-for` 里使用范围值** 

```
<span v-for="n in 10">{{ n }}</span>
//n的取值在1~10
```

**通过 key 管理状态**

- `key` 在这里是一个通过 `v-bind` 绑定的特殊属性
- 类似索引，让Vue通过唯一的key值分辨这个节点 

```
<div v-for="item in items" :key="item.id">
  <!-- 内容 -->
</div>
```

## 事件处理

使用 **v-on** 指令 (简写为 `@`) 来监听 DOM 事件

用法：`v-on:click="handler"` 或 `@click="handler"`。

#### 事件修饰符

```
<!-- 单击事件将停止传递 -->
<a @click.stop="doThis"></a>

<!-- 提交事件将不再重新加载页面 -->
<form @submit.prevent="onSubmit"></form>

<!-- 修饰语可以使用链式书写 -->
<a @click.stop.prevent="doThat"></a>

<!-- 也可以只有修饰符 -->
<form @submit.prevent></form>

<!-- 仅当 event.target 是元素本身时才会触发事件处理器 -->
<!-- 例如：事件处理器不来自子元素 -->
<div @click.self="doThat">...</div>

<!-- 添加事件监听器时，使用 `capture` 捕获模式 -->
<!-- 例如：指向内部元素的事件，在被内部元素处理前，先被外部处理 -->
<div @click.capture="doThis">...</div>

<!-- 点击事件最多被触发一次 -->
<a @click.once="doThis"></a>

<!-- 滚动事件的默认行为 (scrolling) 将立即发生而非等待 `onScroll` 完成 -->
<!-- 以防其中包含 `event.preventDefault()` -->
<div @scroll.passive="onScroll">...</div>
```

## 表单输入绑定（数据绑定+监听事件）

- **v-model **  :   (数据绑定)将表单输入框的内容同步给 JavaScript 中相应的变量。

```
<input v-model="text">
```



# 深入组件

## 注册

#### 全局注册 

- `app.component()` 方法，让组件在当前 Vue 应用中全局可用。

```
import MyComponent from './App.vue'

app.component('MyComponent', MyComponent)
```

#### 局部注册

- 使用 `<script setup>` 的单文件组件中，导入的组件可以直接在模板中使用。

```
<script setup>
import ComponentA from './ComponentA.vue'
</script>

<template>
  <ComponentA />
</template>
```

## Props （参数）

**Props 声明** 

- 父组件通过 props 向下传递数据给子组件

- 在使用 `<script setup>` 的单文件组件中，props 可以使用 `defineProps()` 宏来声明

```
<script setup>
const props = defineProps(['foo'])

console.log(props.foo)
</script>
```

- **Prop 名字格式** ：通常会将其写为 kebab-case 形式

```
<MyComponent greeting-message="hello" />
```

#### 静态props

```
<BlogPost title="My journey with Vue" />
```

#### 动态props

- 使用 `v-bind` 或缩写 `:` 来进行动态绑定的 props

```
<!-- 根据一个变量的值动态传入 -->
<BlogPost :title="post.title" />

<!-- 根据一个更复杂表达式的值动态传入 -->
<BlogPost :title="post.title + ' by ' + post.author.name" />
```

- **不同类型值**（Number ，Boolean，Array ，Object  ）
- Boolean

```
<!-- 仅写上 prop 但不传值，会隐式转换为 `true` -->
<BlogPost is-published />

<!-- 虽然 `false` 是静态的值，我们还是需要使用 v-bind -->
<!-- 因为这是一个 JavaScript 表达式而不是一个字符串 -->
<BlogPost :is-published="false" />

<!-- 根据一个变量的值动态传入 -->
<BlogPost :is-published="post.isPublished" />
```

- **单向数据流** ：props 因父组件的更新而变化，自然地将新的状态向下流往子组件，而不会逆向传递。

- **Boolean 类型转换** 

```
defineProps({
  disabled: Boolean
})
<!-- 等同于传入 :disabled="true" -->
<MyComponent disabled />

<!-- 等同于传入 :disabled="false" -->
<MyComponent />
```



## 事件

#### 触发与监听事件

- 在组件的模板表达式中，可以直接使用 `$emit` 方法触发自定义事件

```
<!-- MyComponent -->
<button @click="$emit('someEvent')">click me</button>
```

- 父组件可以通过 `v-on` (缩写为 `@`) 来监听事件

```
<MyComponent @some-event="callback" />
```

#### 事件参数 

- 需要在触发事件时附带一个特定的值（参数），可以给 `$emit` 提供一个额外的参数。

```
<button @click="$emit('increaseBy', 1)">
  Increase by 1
</button>
```

- 在父组件中监听事件，可以用一个组件方法来作为事件处理函数。

```
<MyButton @increase-by="increaseCount" />
//该方法接收到事件所传递的参数
function increaseCount(n) {
  count.value += n
}
```

- **声明触发的事件**：组件可以显式地通过 [`defineEmits()`](https://cn.vuejs.org/api/sfc-script-setup.html#defineprops-defineemits) 宏来声明它要触发的事件

```
<script setup>
const emit = defineEmits(['inFocus', 'submit'])

function buttonClick() {
  emit('submit')
}
</script>
```

- **事件校验**：事件可以被赋值为一个函数，接受的参数就是抛出事件时传入 `emit` 的内容，返回一个布尔值来表明事件是否合法。

```
<script setup>
const emit = defineEmits({
  // 没有校验
  click: null,

  // 校验 submit 事件
  submit: ({ email, password }) => {
    if (email && password) {
      return true
    } else {
      console.warn('Invalid submit event payload!')
      return false
    }
  }
})

function submitForm(email, password) {
  emit('submit', { email, password })
}
</script>
```

## 组件v-model

- `v-model` 可以在组件上使用以实现双向绑定。

- **`v-model` 的参数** :默认情况，`v-model` 在组件上都是使用 `modelValue` 作为 prop，并以 `update:modelValue` 作为对应的事件。

  ​								可以通过给 `v-model` 指定一个参数来更改这些名字。

```
<MyComponent v-model:title="bookTitle" />
```



## 透传 Attributes 

- **Attributes 继承** （单根节点）：当一个组件以单个元素为根作渲染时，透传的 attribute 会自动被添加到根元素上。

```
<!-- <MyButton> 的模板 -->
<button>click me</button>

//父组件使用
<MyButton class="large" />

//渲染出的 DOM 结果
<button class="large">click me</button>
```

- **对 `class` 和 `style` 的合并** ：子组件有id,style,class时，父组件引用时也添加了id,style,class，渲染结果就是子＋父(id,style ,class)

```
<!-- <MyButton> 的模板 -->
<button class="btn">click me</button>

//渲染出的 DOM 结果
<button class="btn large">click me</button>
```

- **禁用 Attributes 继承** ：在组件选项中设置 `inheritAttrs: false`。要在<script> 块中书写这个声明。

```
<script>
// 使用普通的 <script> 来声明选项
export default {
  inheritAttrs: false
}
</script>
```

- **在 JavaScript 中访问透传 Attributes** ：可以在 `<script setup>` 中使用 `useAttrs()` API 来访问一个组件的所有透传 attribute。

```
<script setup>
import { useAttrs } from 'vue'

const attrs = useAttrs()
</script>
```

## 插槽 Slots 

- 子组件里有个插槽出口（`<slot>` ），标示了父元素提供的**插槽内容**将在哪里被渲染。
- 子组件内部内容（插槽）由父组件提供。

```
<FancyButton>
  Click me! <!-- 插槽内容 -->
</FancyButton>

//FancyButton模板
<button class="fancy-btn">
  <slot></slot> <!-- 插槽出口 -->
</button>

//渲染出的 DOM 
<button class="fancy-btn">Click me!</button>
```

- **渲染作用域** ：父组件模板中的表达式只能访问父组件的作用域；子组件模板中的表达式只能访问子组件的作用域。

#### 具名插槽 

- 在一个组件中设置多个插槽出口，<slot>元素可以有一个特殊的 attribute   `name`。
- **v-slot**   缩写     **#**

```
//子组件
<div class="container">
  <header>
    <slot name="header"></slot>
  </header>
  <main>
    <slot></slot>
  </main>
  <footer>
    <slot name="footer"></slot>
  </footer>
</div>

//父组件
<BaseLayout>
  <template v-slot:header>
    <!-- header 插槽的内容放这里 -->
  </template>
</BaseLayout>
```

## 依赖注入 

- 为组件后代提供数据，需要使用到 [`provide()`](https://cn.vuejs.org/api/composition-api-dependency-injection.html#provide) 函数。

```
<script setup>
import { provide } from 'vue'

provide(/* 注入名 */ 'message', /* 值 */ 'hello!')
</script>
```

- 要注入上层组件提供的数据，需使用 [`inject()`](https://cn.vuejs.org/api/composition-api-dependency-injection.html#inject) 函数。

  ```
  <script setup>
  import { inject } from 'vue'
  
  const message = inject('message')
  </script>
  ```

# 逻辑复用

## 组合式函数

- “组合式函数”(Composables) 是一个利用 Vue 的组合式 API 来封装和复用**有状态逻辑**的函数。
- 组合式函数约定用驼峰命名法命名，并以“**use**”作为开头。
- 组合式函数中使用 `ref()`

相当于把一个函数提取出来，单独放到js文件里，需要的时候引用，函数会返回结果

```
// mouse.js
import { ref, onMounted, onUnmounted } from 'vue'

// 按照惯例，组合式函数名以“use”开头
export function useMouse() {
  // 被组合式函数封装和管理的状态
  const x = ref(0)
  const y = ref(0)

  // 组合式函数可以随时更改其状态。
  function update(event) {
    x.value = event.pageX
    y.value = event.pageY
  }

  // 一个组合式函数也可以挂靠在所属组件的生命周期上
  // 来启动和卸载副作用
  onMounted(() => window.addEventListener('mousemove', update))
  onUnmounted(() => window.removeEventListener('mousemove', update))

  // 通过返回值暴露所管理的状态
  return { x, y }
}


<script setup>
import { useMouse } from './mouse.js'

const { x, y } = useMouse()
</script>

<template>Mouse position is at: {{ x }}, {{ y }}</template>
```

#### 异步状态示例

- 需要接收一个参数的组合式函数示例。在做异步数据请求时，我们常常需要处理不同的状态：加载中、加载成功和加载失败。

```
// fetch.js
import { ref } from 'vue'

export function useFetch(url) {
  const data = ref(null)
  const error = ref(null)

  fetch(url)
    .then((res) => res.json())
    .then((json) => (data.value = json))
    .catch((err) => (error.value = err))

  return { data, error }
}
```

## 自定义指令

- 一个自定义指令由一个包含类似组件生命周期钩子的对象来定义。
- 在 `<script setup>` 中，任何以 `v` 开头的驼峰式命名的变量都可以被用作一个自定义指令。

```
//当一个 input 元素被 Vue 插入到 DOM 中后，它会被自动聚焦
<script setup>
// 在模板中启用 v-focus
const vFocus = {
  mounted: (el) => el.focus()
}
</script>

<template>
  <input v-focus />
</template>
```

## 插件

- 插件 (Plugins) 是一种能为 Vue 添加全局功能的工具代码。
- 一个插件可以是一个拥有 `install()` 方法的对象，也可以直接是一个安装函数本身。

```
//安装一个插件
import { createApp } from 'vue'

const app = createApp({})

app.use(myPlugin, {
  /* 可选的选项 */
})
const myPlugin = {
  install(app, options) {
    // 配置此应用
  }
}
```

# 内置组件

## Transition 

- 制作基于状态变化的过渡和动画。
- `<Transition>` 会在一个元素或组件进入和离开 DOM 时应用动画。

```
<button @click="show = !show">Toggle</button>
<Transition name="fade">
  <p v-if="show">hello</p>
</Transition>

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
```

#### CSS 过渡 class 

1. `v-enter-from`：进入动画的起始状态。在元素插入之前添加，在元素插入完成后的下一帧移除。
2. `v-enter-active`：进入动画的生效状态。应用于整个进入动画阶段。在元素被插入之前添加，在过渡或动画完成之后移除。这个 class 可以被用来定义进入动画的持续时间、延迟与速度曲线类型。
3. `v-enter-to`：进入动画的结束状态。在元素插入完成后的下一帧被添加 (也就是 `v-enter-from` 被移除的同时)，在过渡或动画完成之后移除。
4. `v-leave-from`：离开动画的起始状态。在离开过渡效果被触发时立即添加，在一帧后被移除。
5. `v-leave-active`：离开动画的生效状态。应用于整个离开动画阶段。在离开过渡效果被触发时立即添加，在过渡或动画完成之后移除。这个 class 可以被用来定义离开动画的持续时间、延迟与速度曲线类型。
6. `v-leave-to`：离开动画的结束状态。在一个离开动画被触发后的下一帧被添加 (也就是 `v-leave-from` 被移除的同时)，在过渡或动画完成之后移除。

#### 动态过渡 

- `<Transition>` 的 props (比如 `name`) 也可以是动态的！这让我们可以根据状态变化动态地应用不同类型的过渡

```
<Transition :name="transitionName">
  <!-- ... -->
</Transition>
```

## TransitionGroup 

- 用于对 `v-for` 列表中的元素或组件的插入、移除和顺序改变添加动画效果。

##### 进入 / 离开动画 

```
<TransitionGroup name="list" tag="ul">
  <li v-for="item in items" :key="item">
    {{ item }}
  </li>
</TransitionGroup>

.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
```

## KeepAlive 

- 在多个组件间动态切换时缓存被移除的组件实例。
- 保存另一个缓存数据

```
<!-- 非活跃的组件将会被缓存！ -->
<KeepAlive>
  <component :is="activeComponent" />
</KeepAlive>
```

##### 最大缓存实例数 

- 通过传入 `max` prop 来限制可被缓存的最大组件实例数

```
<KeepAlive :max="10">
  <component :is="activeComponent" />
</KeepAlive>
```

##### 缓存实例的生命周期 

- 一个持续存在的组件可以通过 [`onActivated()`](https://cn.vuejs.org/api/composition-api-lifecycle.html#onactivated) 和 [`onDeactivated()`](https://cn.vuejs.org/api/composition-api-lifecycle.html#ondeactivated) 注册相应的两个状态的生命周期钩子

## Teleport 

- 可以将一个组件内部的一部分模板“传送”到该组件的 DOM 结构外层的位置去。

