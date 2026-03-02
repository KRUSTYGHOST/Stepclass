//istead of repetetive system.out.println() we can use string.join() method to print the same pattern using array of strings and a single print statement.
class uc4 {
    public static void main(String[] args) {
        String[] lines = {
            String.join(" ", "   ***   ", "      ***      ", "   ******    "),
            String.join(" ", " **   ** ", "    **   **    ", "   **   **   "),
            String.join(" ", " **   ** ", "    **   **    ", "   **    **  "),
            String.join(" ", " **   ** ", "    **   **    ", "   **  **    "),
            String.join(" ", " **   ** ", "    **   **    ", "   **        "),
            String.join(" ", " **   ** ", "    **   **    ", "   **        "),
            String.join(" ", "   ***   ", "      ***      ", "   **        ")
        };

        System.out.println(String.join("\n", lines));
    }
}
