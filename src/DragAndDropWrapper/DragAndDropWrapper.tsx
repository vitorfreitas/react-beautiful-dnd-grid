import React, { ReactElement, CSSProperties } from "react";
import { DragDropContext, Droppable, DroppableProvided, DroppableStateSnapshot, DropResult } from "react-beautiful-dnd";
import { ListManagerItem } from "./ListManagerItem";
import hash from "object-hash";

interface Location {
  id: string;
  index: number;
}

export interface DragAndDropResult {
  source: Location;
  destination: Location;
}

export interface Chunk {
  id: string;
  items: any[];
}

export interface Props {
  chunks: Chunk[];
  direction: "horizontal" | "vertical";
  render(item: any): ReactElement<{}>;
  onDragEnd(result: DropResult): void;
  isDragDisabled?: boolean;
  containerStyles?: CSSProperties;
  gap?: number;
  ref?: React.LegacyRef<any>;
}

const horizontalStyle: CSSProperties = {
  display: "flex",
  flexDirection: "row",
  alignItems: "flex-start"
};

export const DragAndDropWrapper: React.FC<Props> = props => {
  const { onDragEnd, chunks, direction, render, isDragDisabled, containerStyles, gap, ref } = props;

  return (
    <DragDropContext ref={ref} onDragEnd={onDragEnd}>
      {chunks.map(({ id: droppableId, items }: Chunk) => (
        <Droppable key={droppableId} droppableId={droppableId} direction={direction}>
          {(provided: DroppableProvided, _: DroppableStateSnapshot) => (
            <div
              ref={provided.innerRef}
              style={direction === "horizontal" ? { ...horizontalStyle, ...containerStyles, gap } : containerStyles}
              {...provided.droppableProps}
            >
              {items.map((item: any, index: number) => (
                <div style={{ marginBottom: gap }}>
                  <ListManagerItem
                    key={hash(item)}
                    item={item}
                    index={index}
                    render={render}
                    isDragDisabled={isDragDisabled}
                  />
                </div>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      ))}
    </DragDropContext>
  );
};

function mapAndInvoke(onDragEnd: (result: DragAndDropResult) => void) {
  return function({ source, destination }: DropResult): void {
    if (destination !== undefined && destination !== null) {
      const result: DragAndDropResult = {
        source: {
          id: source.droppableId,
          index: source.index
        },
        destination: {
          id: destination.droppableId,
          index: destination.index
        }
      };
      onDragEnd(result);
    }
  };
}
