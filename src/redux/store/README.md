# State Model

Only business requirements we have is that `A user wants to create a list of steps to follow to get a common task done`

So the Domain model can be a **DO IT YOURSELF** `Task`, which has the **task description** and a **list of steps** to finish the task.

```typescript
interface Task {
  description: string
  steps: Array<Step>
  author: User
}
```

A `Step` has instructions that allows a user to get part of the task done.
1. A *Step* can be a Text
2. A *Step* can be an Image
3. A *Step* can be a Video

* NOTE that for clarity, a *Step* must have one and only 

```typescript
interface Step {
  order: number
  contentType: enum // TEXT, IMAGE, VIDEO
  content: Text | Image | Video 
}
```

```typescript
interface Text {
  description: string
}
interface Image {
  mediaType: string
  url: STRING
}
interface Video {
  mediaType: string
  url: string
}
```

Now we need a way to store user credentials and profile
```typescript
interface Auth {
  tokenType: string
  token: string
}
```

```typescript
interface User {
  name: string
  email: string
  isContractor: boolean
}
```

## Complete state 

```typescript
interface StateModel {
  auth: Auth
  me: User
  tasks: Array<Task>
  shared: Array<Task>
}
```

* NOTE that since we are planning to use `mastermind` library for state management, we will modify the structure of the state model a little.
	* We'll be replacing `Array` with `Immutable.Map` everywhere in our store. Ex. `Array<Step> => Immutable.Map<String, Step>` where the key in this map is an id of the object being saved.

```typescript
interface StateModel {
  appState: { isFetching: {}, errors: {}. modals: {} },
  auth: { user: User, auth: Auth }
  data: { tasks: Immutable.Map<String, Task>, shared: Immutable.Map<String, Task> }
}
```
