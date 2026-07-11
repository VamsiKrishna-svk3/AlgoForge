import { generateHeatmapData } from "../utils/generateHeatmap";
import "../styles/Heatmap.css";

function Heatmap({ data }) {

    const { weeks, monthLabels } = generateHeatmapData(data);

    const totalProblems = data.reduce(
        (sum, day) => sum + day.count,
        0
    );

    const activeDays = data.filter(
        day => day.count > 0
    ).length;

    const levelClass = (count) => {

        if (count === 0) return "level-0";
        if (count === 1) return "level-1";
        if (count === 2) return "level-2";
        if (count <= 4) return "level-3";
        return "level-4";

    };

    return (

        <div className="heatmap-card">

            {/* Header */}

            <div className="heatmap-header">

                <div>

                    <h2>Coding Activity</h2>

                    <p>
                        {totalProblems} problems solved in the last 365 days
                    </p>

                </div>

                <div className="heatmap-summary">

                    <div>

                        <h3>{activeDays}</h3>

                        <span>Active Days</span>

                    </div>

                    <div>

                        <h3>{totalProblems}</h3>

                        <span>Problems</span>

                    </div>

                </div>

            </div>

            {/* Heatmap */}

            <div className="heatmap-wrapper">

                {/* Left weekday labels */}

                <div className="weekday-labels">

                    <span></span>

                    <span>Mon</span>

                    <span></span>

                    <span>Wed</span>

                    <span></span>

                    <span>Fri</span>

                    <span></span>

                </div>

                <div className="heatmap-content">

                    {/* Month labels */}

                    <div className="months-row">

                        {monthLabels.map((month) => (

                            <span
                                key={month.week}
                                className="month-label"
                                style={{
                                    gridColumnStart: month.week + 1
                                }}
                            >
                                {month.month}
                            </span>

                        ))}

                    </div>

                    {/* Continuous Grid */}

                    <div className="heatmap-grid">

                        {weeks.map((week, weekIndex) => (

                            <div
                                key={weekIndex}
                                className="week-column"
                            >

                                {week.map((day, dayIndex) => (

                                    day ? (

                                        <div
                                            key={dayIndex}
                                            className={`cell ${levelClass(day.count)}`}
                                            title={`${day.date} • ${day.count} solved`}
                                        />

                                    ) : (

                                        <div
                                            key={dayIndex}
                                            className="cell empty-cell"
                                        />

                                    )

                                ))}

                            </div>

                        ))}

                    </div>

                </div>

            </div>

            {/* Footer */}

            <div className="heatmap-footer">

                <span>
                    Today:&nbsp;
                    {new Date().toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "short",
                        year: "numeric"
                    })}
                </span>

                <div className="legend">

                    <span>Less</span>

                    <div className="cell level-0"></div>

                    <div className="cell level-1"></div>

                    <div className="cell level-2"></div>

                    <div className="cell level-3"></div>

                    <div className="cell level-4"></div>

                    <span>More</span>

                </div>

            </div>

        </div>

    );

}

export default Heatmap;