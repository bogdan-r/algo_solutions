package model;

import java.util.HashMap;
import java.util.LinkedList;
import java.util.Set;

public class PriorityQueue<T> {
    private final LinkedList<PriorityNode<T>> list;

    public PriorityQueue() {
        this.list = new LinkedList<>();
    }

    public void enqueue(int priority, T item) {
        PriorityNode<T> priorityNode = new PriorityNode<>(priority, item);

        for (int i = 0; i < this.list.size(); i++) {
            PriorityNode<T> currentPriorityNode = this.list.get(i);

            if(priority >= currentPriorityNode.getPriority()) {
                this.list.add(i, priorityNode);
                return;
            }
        }

        this.list.add(priorityNode);
    }

    public T dequeue() {
        return this.list.removeFirst().getItem();
    }

    private record PriorityNode<T>(int priority, T item) {

        public int getPriority() {
            return priority;
        }

        public T getItem() {
            return item;
        }
    }
}

