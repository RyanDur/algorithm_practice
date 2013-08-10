class Binary_Search

  # The algorithm provides steps to examine a sorted collection for a
  # stipulated search value. If the search value does not match any
  # values in the collection, then the return value will be undefined,
  # null or some message showing there was no match.
  #
  # Visualize the container from left to right, where the contents on
  # the left are less in value than the contents on the right.
  #
  # Start the search by setting an upper and lower boundary as the
  # first and last position of the collection, and selecting the middle
  # position as the starting point. If the value being searched for is
  # not found at the center point of the boundary, then the search will
  # be performed on either the left or right half of the collection. If
  # the search value is less than the middle value in the collection,
  # then it is in the left hand portion, and the max position is the
  # old middle point minus one creating a new upper boundary. If the
  # value is greater than the middle value then it is in the right hand
  # portion of the collection, then the minimum will be set to the old
  # middle point plus one creating a new lower boundary. Once the new
  # boundary is set, the middle position of this sub-array is·
  # calculated and compared with the search value. These steps are
  # repeated on subsequent sub-arrays until the search value is found
  # or until there is nowhere left to search.

  def search collection, value
    # set the upper boundary
    max = collection.size-1

    # set the lower boundary
    min = 0

    # as long as the upper boundary hasn't fallen beneath the lower
    while max >= min
      # set the middle of the of the collection being searched
      mid = (min + max)/2

      # if the value being serched for is greater than the value found
      if collection.get_at(mid) < value

        # set the new lower boundary as the old middle point plus one
        min = mid + 1

      # else if the value being searched is less than the value found
      elsif collection.get_at(mid) > value

      # set the new upper boundary as the old middle plus one
        max = mid - 1
      else

      # if the value is neither greater than the lower boundary and
      # not less than the upper boundary then the value has been found
      # and return the position it has located.
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
