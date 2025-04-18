import {
  closestCenter,
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  UniqueIdentifier,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { useSortable } from '@dnd-kit/sortable'
import { Drag } from './icons'

type Props<T> = {
  children: (item: T, index: number) => React.ReactNode
  setItems: (items: T[]) => void
  items: T[]
  disableDragByIndex?: number
}

function ItemWrapper({
  children,
  id,
  hasDragDisabled,
}: {
  children: React.ReactNode
  id: UniqueIdentifier
  hasDragDisabled: boolean
}) {
  const {
    attributes,
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore - type declaration appears to be incorrect
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id })
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <div style={style} className="flex w-full items-center">
      {hasDragDisabled ? (
        <div className="size-8" />
      ) : (
        <div ref={setNodeRef} {...attributes} {...listeners} className="size-8">
          <Drag />
        </div>
      )}
      <div className="grow">{children}</div>
    </div>
  )
}

export function SortableArea<T extends { id: UniqueIdentifier }>({
  children,
  setItems,
  items,
  disableDragByIndex,
}: Props<T>) {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event

    if (over == null) {
      // The item was dropped in it's original place
      return
    }

    if (active.id !== over.id) {
      const oldIndex = items.findIndex(({ id }) => id === active.id)
      const newIndex = items.findIndex(({ id }) => id === over.id)

      setItems(arrayMove(items, oldIndex, newIndex))
    }
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={items} strategy={verticalListSortingStrategy}>
        {items.map((item, index) => (
          <ItemWrapper
            key={index}
            id={item.id}
            hasDragDisabled={disableDragByIndex === index}
          >
            {children(item, index)}
          </ItemWrapper>
        ))}
      </SortableContext>
    </DndContext>
  )
}
