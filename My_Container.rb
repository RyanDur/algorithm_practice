class My_Container

  def initialize num
    @my_array = Array.new(num)

    if !num.is_a? Array
      @my_array.each_index{|i| @my_array[i] = i}
    end
  end

  def size
    @my_array.size
  end

  def insert num
    @my_array.push num
  end

  def insert_at num, index
    @my_array.push(nil)

    (@my_array.size-1).downto(index+1).each do |i|
      @my_array[i] = @my_array[i-1]
    end

    @my_array[index] = num
  end

  def contains? num
    result = false

    @my_array.each do |i|
      if (i == num)
        return result = true
      end
    end

    result
  end

  def get_at index
    @my_array[index]
  end

  def delete_at index
    value = @my_array[index]
    @my_array[index] = nil

    (index...@my_array.size-1).each do |num|
      @my_array[num] = @my_array[num+1]
    end

    @my_array.pop
    value
  end

  def print
    puts '---------'
    @my_array.each_index do |i|
      puts "| #{i} | #{@my_array[i]} |"
      puts '---------'
    end
  end

  def print_search result
    puts '---------'
    @my_array.each_index do |i|
      puts "| #{i} | #{@my_array[i]} | #{true if result.include?(i)}"
      puts '---------'
    end
  end
end
