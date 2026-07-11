export function generateHeatmapData(activityData) {

    const activityMap = {};

    activityData.forEach(day => {
        activityMap[day.date] = day.count;
    });

    const today = new Date();

    const endDate = new Date(today);

    const startDate = new Date(today);

    startDate.setDate(endDate.getDate() - 364);

    // Move to previous Sunday (same as GitHub/LeetCode)
    const first = new Date(startDate);

    first.setDate(first.getDate() - first.getDay());

    const weeks = [];

    const monthLabels = [];

    let current = new Date(first);

    let lastMonth = -1;

    while (current <= endDate) {

        const week = [];

        for (let day = 0; day < 7; day++) {

            const date = current.toISOString().split("T")[0];

            if (
                current >= startDate &&
                current <= endDate
            ) {

                week.push({
                    date,
                    count: activityMap[date] || 0
                });

            }

            else {

                week.push(null);

            }

            current.setDate(current.getDate() + 1);

        }

        weeks.push(week);

    }

    weeks.forEach((week, index) => {

        const firstDay = week.find(day => day);

        if (!firstDay)
            return;

        const d = new Date(firstDay.date);

        if (d.getMonth() !== lastMonth) {

            monthLabels.push({

                month: d.toLocaleString("default", {
                    month: "short"
                }),

                week: index

            });

            lastMonth = d.getMonth();

        }

    });

    return {

        weeks,

        monthLabels

    };

}