class Bubble_Sort

  def sort collection
    (collection.size-1).downto(0).each do |i|
      (0..i-1).each do |j|
        if collection.get_at(j) > collection.get_at(j+1)
          swap collection, j, j+1
        end
      end
    end
  end

  private

  def swap collection, p1, p2
    temp = collection.get_at(p1)
    collection.set_at(collection.get_at(p2), p1)
    collection.set_at(temp, p2)
  end

end
