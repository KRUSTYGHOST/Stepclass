//print this using for loop and array of strings
public class uc5 {
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

        for (String line : lines) {
            System.out.println(line);
        }
    }
}
/*Create separate methods to build patterns for O, P, and S using String.join().

At array declaration, call these methods to populate the banner lines in order.

Maintain the 7-line, 9-character width alignment for each letter.

Use a loop (enhanced for loop preferred) to print each line of the banner.*/
