class Linear_Search

  def initialize
    @result = []
  end

  def recursive_find num, container
    if (container.empty?)
      res = @result
      @result = []
      return res
    end

    @result.push container.size-1 if container.get_at(container.size-1) == num
    container.delete_at container.size-1
    recursive_find(num, container)
  end

  def find num, container
    result = []
    (0...container.size).each do |index|
      if num == container.get_at(index)
        result.push index
      end
    end
    result
  end
end
