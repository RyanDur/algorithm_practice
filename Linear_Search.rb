class Linear_Search

  def initialize container
    @container = container
  end

  def find num
    result = []
    (0...@container.size).each do |index|
      if num == @container.get_at(index)
        result.push index
      end
    end
    result
  end
end
