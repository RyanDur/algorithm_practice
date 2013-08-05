class Insertion_sort

  # (Insertion sort iterates, consuming one input element each repetition,
  # and growing a sorted output list. Each iteration, insertion sort
  # removes one element from the input data, finds the location it belongs
  # within the sorted list, and inserts it there. It repeats until no
  # input elements remain.) http://en.wikipedia.org/wiki/Insertion_sort

  def sort collection
    (1..collection.size-1).each do |i|
      value = collection.get_at i
      hole = i

      while hole > 0 && value < collection.get_at(hole-1)
        collection.set_at(collection.get_at(hole-1), hole)
        hole -= 1
      end

      collection.set_at(value, hole)
    end
  end
end
