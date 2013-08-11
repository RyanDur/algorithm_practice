class Linear_Search

=begin
Linear Search or Sequential Search
  The algorithm searches through a list sequentially for
  a provided value

  Visualize the container from left to right.

  Search from the beginning of a collection to the end
  or until the value is found and return the index.

  * Iterates through a collection serching for a match to the number given.
  * The worst case scenario is it may have to move through the whole collection
    looking for a matching value.
  * Best case is it finds its match in the beginning.
  * This algorithim does not depend on an ordered list since it has to iterate and
    check every position.

  The steps it takes to finish the function depends on the size of the collection
  it recieves. With the size being n, as n tends towards the infinate the constansts
  become irrelevant. We can drop the constants and state the algorithim as having a
  big O(n).
=end


  # 2n + 1
  def find_first num, container
    (0...container.size).each do |index|                    # n steps
      if container.get_at(index) == num                     # n steps
        return index                                        # 1 step
      end                                                   #
    end                                                     #
    nil                                                     # 1 step
  end


  # 3n
  def recursive_find_first num, container, index
    return nil if index >= container.size                   # n steps
    return index if container.get_at(index) == num          # n steps
    #
    recursive_find_first num, container, index+=1           # n steps
  end


  # 3n + 4
  def recursive_find_all num, container, index, result = []
    if index >= container.size                              # n steps
      return nil if result.empty?                           # 1 step
      return result                                         # 1 step
    end

    result.push index if container.get_at(index) == num     # n steps
    recursive_find_all num, container, index+=1, result     # n steps
  end


  # 3n + 2
  def find_all num, container
    result = []                                             # 1 step
    (0...container.size).each do |index|                    # n steps
      if container.get_at(index) == num                     # n steps
        result.push index                                   # n steps
      end                                                   #
    end                                                     #
    result.empty? ? nil : result                            # 1 step
  end

  def ruby_find_first num, container
    container.index(num)
  end

  def ruby_find_all num, container
    container.each_index.select{|i| num == container[i]}
  end
end
