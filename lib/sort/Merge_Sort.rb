class Merge_Sort

  def sort collection
    return collection if collection.length <= 1
    mid = collection.length / 2

    left = split collection, 0, mid
    right = split collection, mid, collection.length

    left = sort left
    right = sort right

    merge left, right
  end

  private
  def merge left, right, result = []
    return result if  left.length < 1 && right.length < 1
    if left.length > 0 && right.length > 0
      if left.first <= right.first
        result.push left.shift
      else
        result.push right.shift
      end
    elsif left.length > 0
      result.push left.shift
    elsif right.length > 0
      result.push right.shift
    end
    merge left, right, result
  end

  def split collection, start, finish, result = []
    return result if start >= finish
    result.push collection[start]
    split collection, start+=1, finish, result
  end
end
