class Heap_Sort

  def sort collection
    @heap = collection
    @size = collection.size-1
    heapify
    sequentialize
    @heap
  end

  private
  def sequentialize last = @size
    return if last <= 0
    swap 0, last
    sort_down 0, last-1
    sequentialize last-1
  end

  def heapify parent = @size/2
    return if parent < 0
    sort_down parent
    heapify parent-1
  end

  def swap parent, child
    @heap[parent], @heap[child] = @heap[child], @heap[parent]
  end

  def sort_down parent, heap_end = @size
    left_child = 2*parent + 1
    right_child = left_child + 1

    if right_child <= heap_end and
      @heap[right_child] > @heap[parent] and
      @heap[left_child] < @heap[right_child]

      swap parent, right_child
      sort_down right_child, heap_end

    elsif left_child <= heap_end and
      @heap[parent] < @heap[left_child]

      swap parent, left_child
      sort_down left_child, heap_end
    end
  end
end
