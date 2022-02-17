# react-beautiful-dnd-grid

## Installation

```
npm i @constantindjm/react-beautiful-dnd-grid --save-dev
```

## Demo

https://stackblitz.com/edit/react-beautiful-dnd-grid-demo

![Demo gif](./doc/demo.gif)

## Usage

```javascript
import React, { useState } from "react";
import { ListManager } from "@constantindjm/react-beautiful-dnd-grid";

const noop = function() {};

const list = [{ id: "0" }, { id: "1" }, { id: "2" }, { id: "3" }, { id: "4" }];

const ListElement = props => <div>id: {props.item.id}</div>;

const Component = () => {
  const [disableDrag, setDisableDrag] = useState(false);

  return (
    <ListManager
      items={list}
      direction="horizontal"
      maxItems={3}
      render={item => <ListElement item={item} />}
      onDragEnd={noop}
      isDragDisabled={disableDrag}
    />
  );
};
```
