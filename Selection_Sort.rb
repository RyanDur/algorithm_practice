class Selection_Sort
=begin
  An algorithim to sort a collection by swapping the values that are
  smaller with the larger.

  Visualize the container from left to right. Once sorted, the contents
  on the left will be less in value than the contents on the right.

  From the beginning of the collection, keep the left hand side of the
  collection sorted by finding the smallest values in sequential order
  and swapping them with the index.
=end
  def sort collection
    # From the beginning to second to last
    (0..collection.size-2).each do |i|
      # label the index as the minimum
      min = i

      # from one past the index
      ((i+1)..collection.size-1).each do |j|

        # find the smallest value in the collection
        # if the value at the inner index is smaller than
        # the minimum
        if collection.get_at(j) < collection.get_at(min)
          # set the new minimum index
          min = j
        end
      end

      # as long as the minimum is not the index the pointer is at
      if min != i

        # swap the values
        collection.swap i, min
      end
    end
  end
end
