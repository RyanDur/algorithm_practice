class Binary_Search

  # (...finds the position of a specified input value (the search "key")
  # within an array sorted by key value.[1][2] In each step,
  # the algorithm compares the search key value with the key value of
  # the middle element of the array. If the keys match, then a
  # matching element has been found and its index, or position, is
  # returned. Otherwise, if the search key is less than the middle
  # element's key, then the algorithm repeats its action on the
  # sub-array to the left of the middle element or, if the search key
  # is greater, on the sub-array to the right. If the remaining array
  # to be searched is empty, then the key cannot be found in the
  # array and a special "not found" indication is returned.)
  # http://en.wikipedia.org/wiki/Binary_search_algorithm

  def search collection, value
    max = collection.size-1
    min = 0
    while max >= min
      mid = (min + max)/2

      if collection.get_at(mid) < value
        min = mid + 1
      elsif collection.get_at(mid) > value
        max = mid - 1
      else
        return mid
      end
    end
  end

  def recursive_search collection, value, min = 0, max = collection.size-1
    return if max < min
    mid = (min + max)/2

    if collection.get_at(mid) < value
      recursive_search collection, value, mid+1, max
    elsif collection.get_at(mid) > value
      recursive_search collection, value, min, mid-1
    else
      return mid
    end
  end
end
