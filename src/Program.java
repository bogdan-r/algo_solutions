import model.*;

import java.util.Date;

public class Program {

    public static void main(String[] args) {
        IArray singleArray = new SingleArray();
        IArray vectorArray = new VectorArray();
        IArray factorArray = new FactorArray();
        IArray matrixArray = new MatrixArray();
        testAddArray(singleArray, 500_000);
        testAddArray(vectorArray, 500_000);
        testAddArray(factorArray, 500_000);
//        testAddArray(matrixArray, 500_000);
        testRemoveArray(singleArray, 500_000);
        testRemoveArray(vectorArray, 500_000);
        testRemoveArray(factorArray, 500_000);
//        testRemoveArray(matrixArray, 100_000);

        PriorityQueue<Integer> priorityQueue = new PriorityQueue<Integer>();
        priorityQueue.enqueue(100, 1);
        priorityQueue.enqueue(10, 2);
        priorityQueue.enqueue(1000, 100);

        System.out.println(priorityQueue.dequeue()); // 100
        System.out.println(priorityQueue.dequeue()); // 1
        System.out.println(priorityQueue.dequeue()); // 2
    }

    private static void testAddArray(IArray data, int total) {
        long start = System.currentTimeMillis();

        for (int j = 0; j < total; j ++)
            data.add(j, 0);

        System.out.println(data + " testAddArray: " +
                (System.currentTimeMillis() - start));
    }

    private static void testRemoveArray(IArray data, int total) {
        long start = System.currentTimeMillis();
        for (int j = 0; j < total; j ++)
            data.remove(0);


        System.out.println(data + " testRemoveArray: " +
                (System.currentTimeMillis() - start));
    }
}
