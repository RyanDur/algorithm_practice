class Stack

  def initialize size
    @stack = Array.new size
    @top = -1
    @upper_bound = size
    @lower_bound = 0
  end

  def push num
    if self.size < @upper_bound
      @stack[@top+=1] = num
    else
      raise "out of bounds"
    end
  end

  def pop
    if self.size > @lower_bound
      @stack[@top] = nil
      @top -= 1
    else
      raise "can't pop empty stack"
    end
  end

  def peek
    @stack[@top]
  end

  def size
    @top + 1
  end
end
