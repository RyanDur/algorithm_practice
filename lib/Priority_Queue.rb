class Priority_Queue < Queue

  def enqueue value
    super value
    sort
  end

  private
  def sort
    (@front+1..@rear).each do |i|
      value = @queue[i]
      hole = i

      while hole > @front && value < @queue[hole-1]
        @queue[hole] = @queue[hole-1]
        hole-=1
      end

      @queue[hole] = value
    end
  end
end
