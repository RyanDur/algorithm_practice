class Heap

  def initialize values = []
    @values = []
    values.each{|value| insert value} unless values.empty?
  end

  def insert value
    @values.push value
    sort_up
  end

  def front
    @values.first
  end

  def delete_front
    swap 0, @values.size-1
    @values.pop
    sort_down
  end

  private
  def swap parent, child
    @values[parent], @values[child] = @values[child], @values[parent]
  end

  def sort_down parent = 0
    left_child = 2*parent + 1
    right_child = left_child + 1

    if @values[right_child] &&
      @values[left_child] < @values[right_child] &&
      @values[parent] < @values[right_child]

      swap parent, right_child
      sort_down parent = right_child

    elsif @values[left_child] &&
      @values[parent] < @values[left_child]

      swap parent, left_child
      sort_down parent = left_child
    end
  end

  def sort_up child = @values.size-1
    parent = (child - 1)/2

    if parent >= 0 && @values[child] > @values[parent]
      swap child, parent
      sort_up parent
    end
  end
end
