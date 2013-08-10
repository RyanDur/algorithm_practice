class Stack

  def initialize size
    @stack = Array.new size
    @top = -1
    @upper_bound = size-1
    @lower_bound = -1
  end

  def push num
    if @top < @upper_bound
      @stack[@top+=1] = num
    else
      raise "out of bounds"
    end
  end

  def pop
    if @top > @lower_bound
      @stack[@top] = nil
      @top -= 1
    else
      raise "can't pop empty stack"
    end
  end

  def peek
    @stack[@top]
  end
end
