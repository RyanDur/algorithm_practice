class Queue

  def initialize size
    @queue = Array.new size
    @upper_bound = size-1
    @front = 0
    @rear = -1
  end

  def enqueue value
    raise "Queue is full" if @rear >= @upper_bound
    @queue[@rear+=1] = value
  end

  def dequeue
    raise 'Queue is empty' if @front > @rear
    @front+=1
    if @front > @rear
      @front = 0
      @rear = -1
    end
  end

  def front
    @queue[@front]
  end

  def rear
    @queue[@rear]
  end
end
