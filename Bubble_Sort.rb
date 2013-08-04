class Bubble_Sort

  # (...a simple sorting algorithm that works by repeatedly stepping through the list to be sorted,
  # comparing each pair of adjacent items and swapping them if they are in the wrong order. The
  # pass through the list is repeated until no swaps are needed, which indicates that the list
  # is sorted.) http://en.wikipedia.org/wiki/Bubble_sort

  def sort collection
    (collection.size-1).downto(0).each do |i|
      (0..i-1).each do |j|
        if collection.get_at(j) > collection.get_at(j+1)
          collection.swap(j, j+1)
        end
      end
    end
  end

end
