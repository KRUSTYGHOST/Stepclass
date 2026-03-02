//create a program to calculate the bill of water unit consumed invalid if units<=0 or negative;first 50 = rs3 per unit; next 100 = rs5 per unit; above 150 = rs8 per unit;boolean subsidy = 15% discount ; if final bill > 3000 add 200 maintenance charge; print the final bill amount
import java.util.Scanner;
public class bill {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Enter the number of water units consumed: ");
        int units = sc.nextInt();

        if (units <= 0) {
            System.out.println("Invalid input. Units must be greater than 0.");
            return;
        }

        double billAmount = 0;

        if (units <= 50) {
            billAmount = units * 3;
        } else if (units <= 100) {
            billAmount = (50 * 3) + ((units - 50) * 5);
        } else if (units <= 150) {
            billAmount = (50 * 3) + (100 * 5) + ((units - 150) * 8);
        }
        else {
            billAmount = (50 * 3) + (100 * 5) + (50 * 8) + ((units - 150) * 8);
        }

        // Apply subsidy
        billAmount *= 0.85; // 15% discount

        // Add maintenance charge if final bill > 3000
        if (billAmount > 3000) {
            billAmount += 200;
        }

        System.out.printf("The final bill amount is: %.2f\n", billAmount);
    }
}