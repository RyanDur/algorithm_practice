class Bubble_Sort

  # A sorting algorithm that compares adjacent indices and
  # continually swaps the contents if they are not in sequence.
  #
  # Visualize the container from left to right, where the
  # unsorted contents on the left will be less in value than
  # the contents on the right.
  #
  # Start at the right most position of the container where the
  # contents will be the largest value. If the last two
  # positions are out-of-order, swap the contents. Then move
  # the position to the left one comparing and swapping the
  # contents of those two adjacent indices, and then compare
  # the original two positions and swap them if they are
  # out-of-order. Continue moving from right to left in the
  # outer loop, while moving left to right in the inner loop
  # comparing and swapping the contents that are out-of-order.
  # The larger values will then bubble up to the top of the
  # list until the contents are sorted.

  def sort collection
    # Count backwards from the second to last index position
    # because we start by comparing the the last two values.
    (collection.size-2).downto(0).each do |i|

      # Start from the outer loops index, moving to the
      # end of the container
      (i..collection.size-2).each do |j|

        # if the contents at the index are greater than the contents
        # at the index plus one
        if collection.get_at(j) > collection.get_at(j+1)

          # swap the contents of the two indices
          collection.swap(j, j+1)
        end
      end
    end
  end

end
