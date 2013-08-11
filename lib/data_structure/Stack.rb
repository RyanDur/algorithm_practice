# bounded Stack
class Stack

  def initialize size
    @stack = Array.new size
    @top = -1
    @upper_bound = size-1
    @lower_bound = 0
  end

  def push num
    raise "out of bounds" if @top+1 > @upper_bound
    @stack[@top+=1] = num
  end

  def pop
    raise "can't pop empty stack" if @top < @lower_bound
    @top -= 1
  end

  def peek
    @stack[@top]
  end
end
