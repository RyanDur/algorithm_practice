class Linear_Search

  def initialize
    @result = []
  end

  def find_first num, container
    (0...container.size).each do |index|
      if container.get_at(index) == num
        return index
      end
    end
    nil
  end

  def recursive_find_first num, container, index
    return nil if index >= container.size
    return index if container.get_at(index) == num

    recursive_find_first num, container, index+=1
  end

  def recursive_find_all num, container, index
    if index >= container.size
      return nil if @result.empty?

      res = @result
      @result = []
      return res
    end

    @result.push index if container.get_at(index) == num
    recursive_find_all num, container, index+=1
  end

  def find_all num, container
    result = []
    (0...container.size).each do |index|
      if container.get_at(index) == num
        result.push index
      end
    end
    result.empty? ? nil : result
  end
end
