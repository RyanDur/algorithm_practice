class Heap_Sort

  def sort collection
    to_sequence heapify collection
  end

  private
  def to_sequence collection, last = collection.size-1
    return collection if last <= 0
    swap collection, 0, last
    sort_down collection, 0, last-1
    to_sequence collection, last-1
  end

  def heapify collection, parent = collection.size-1/2
    return collection if parent < 0
    sort_down collection, parent
    heapify collection, parent-1
  end

  def swap collection, parent, child
    collection[parent], collection[child] = collection[child], collection[parent]
  end

  def sort_down collection, parent, heap_end = collection.size-1
    left_child = 2*parent + 1
    right_child = left_child + 1

    return collection if left_child > heap_end

    if right_child <= heap_end and
      collection[left_child] < collection[right_child] and
      collection[right_child] > collection[parent]

      swap collection, parent, right_child
      sort_down collection, right_child, heap_end
    end

    if collection[parent] < collection[left_child]
      swap collection, parent, left_child
      sort_down collection, left_child, heap_end
    end
  end
end
