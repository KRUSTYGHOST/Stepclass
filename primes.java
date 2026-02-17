
public class prime {
    public static boolean isPrime(int n) {
        if (n < 2) return false;
        if (n % 2 == 0) return n == 2;
        int r = (int) Math.sqrt(n);
        for (int i = 3; i <= r; i += 2) if (n % i == 0) return false;
        return true;
    }
    public static void main(String[] args) {
        if (args.length == 0) { System.out.println("Usage: java Primes check <num>"); return; }
        if ("check".equals(args[0]) && args.length > 1) {
            int n = Integer.parseInt(args[1]);
            System.out.println(n + (isPrime(n) ? " is prime" : " is not prime"));
        }
    }
}