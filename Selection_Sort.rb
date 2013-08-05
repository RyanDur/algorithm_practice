class Selection_Sort
  
  # ("The algorithm divides the input list into two parts: the sublist of items already sorted,
  #  which is built up from left to right at the front (left) of the list, and the sublist of
  #  items remaining to be sorted that occupy the rest of the list. Initially, the sorted
  #  sublist is empty and the unsorted sublist is the entire input list. The algorithm proceeds
  #  by finding the smallest (or largest, depending on sorting order) element in the unsorted
  #  sublist, exchanging it with the leftmost unsorted element (putting it in sorted order),
  #  and moving the sublist boundaries one element to the right.")
  #  http://en.wikipedia.org/wiki/Selection_sort

  def sort collection
    (0..collection.size-2).each do |i|
      min = i

      ((i+1)..collection.size-1).each do |j|
        if collection.get_at(j) < collection.get_at(min)
          min = j
        end
      end

      if min != i
        collection.swap i, min
      end
    end
  end
end
