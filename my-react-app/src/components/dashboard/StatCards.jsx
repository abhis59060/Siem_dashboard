import { Card } from "@/components/ui/card";
import CounterAnimation from "../animations/CounterAnimation"; // Import the counter

// Helper function to extract the numerical value and its suffix (K or %)
const parseValue = (value) => {
  const strValue = String(value); // Ensure it's treated as a string for suffix check
  
  if (strValue.endsWith('K')) {
    // Handle '28K' -> 28000 and suffix 'K'
    return { number: parseFloat(strValue.replace('K', '')) * 1000, suffix: 'K' };
  }
  if (strValue.endsWith('%')) {
    // Handle '99.9%' -> 99.9 and suffix '%'
    return { number: parseFloat(strValue.replace('%', '')), suffix: '%' };
  }
  // Default case for simple numbers (e.g., 25, 1123)
  return { number: parseFloat(strValue), suffix: '' };
};

const cards = [
  { title: "Active Threats", value: 25, color: "text-red-400" },
  { title: "Blocked Attacks", value: 1123, color: "text-green-400" },
  { title: "System Health", value: "99.9%", color: "text-blue-400" },
  { title: "Events Processed", value: "28K", color: "text-yellow-400" },
];

export default function StatCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {cards.map(({ title, value, color }) => {
        // Parse the data to get the number and the suffix
        const { number: finalNumber, suffix } = parseValue(value); 
        
        return (
          <Card 
            key={title} 
            className={`
              p-6 bg-gray-800 border border-gray-700 
              transition-all duration-300 ease-in-out 
              transform 
              hover:shadow-xl hover:shadow-cyan-500/10 
              hover:border-cyan-500/50 
            `}
          >
            <p className={`text-sm font-medium ${color} mb-2`}>{title}</p>
            <p className="text-3xl font-extrabold flex items-end">
              {/* Pass the pure number to the counter's 'to' prop */}
              <CounterAnimation to={finalNumber} />
              
              {/* Display the suffix separately */}
              <span className="text-xl ml-1">{suffix}</span> 
            </p>
          </Card>
        );
      })}
    </div>
  );
}