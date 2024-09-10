import {View, Text, StyleSheet} from 'react-native';
import {useAppStyle} from "@/context/AppStyleContext";
import {useEffect, useMemo} from "react";
import {eachDayOfInterval, endOfWeek, format, startOfWeek} from "date-fns";
import {de} from "date-fns/locale";
import Card from "@/components/Card";
import DonutChart from "@/components/progress/DonutChart";
import BigDonutChart from "@/components/progress/BigDonutChart";
import {Colors, FontSize} from "@/constants/types/styleTypes";
import {Fonts, ThemeSizes} from "@/constants";

const WeekStats = ({date}) => {
    const {fontSizes, colors} = useAppStyle();
    const styles = createStyles(fontSizes, colors);

    // Dummy-Daten für die Woche
    const dummyDailyStats = {
        '2024-09-09': {exercisesCompleted: 2, workouts: 1, totalDuration: 60, totalCalories: 300},
        '2024-09-10': {exercisesCompleted: 3, workouts: 1, totalDuration: 45, totalCalories: 350},
        '2024-09-11': {exercisesCompleted: 5, workouts: 2, totalDuration: 90, totalCalories: 500},
        '2024-09-12': {exercisesCompleted: 1, workouts: 1, totalDuration: 30, totalCalories: 200},
        '2024-09-13': {exercisesCompleted: 4, workouts: 1, totalDuration: 70, totalCalories: 400},
        '2024-09-14': {exercisesCompleted: 2, workouts: 1, totalDuration: 50, totalCalories: 250},
        '2024-09-15': {exercisesCompleted: 0, workouts: 0, totalDuration: 0, totalCalories: 0},
    };

    const selectedDate = useMemo(() => format(date, 'yyyy-MM-dd'), [date]);
    const dailyStats = dummyDailyStats;

    const startDate = useMemo(() => startOfWeek(date, {weekStartsOn: 1}), [date]);
    const endDate = useMemo(() => endOfWeek(date, {weekStartsOn: 1}), [date]);
    const daysOfWeek = useMemo(() => eachDayOfInterval({
        start: startDate,
        end: endDate
    }).slice(0, 7), [startDate, endDate]);
    const markedDate = useMemo(() => format(date, 'EEEE', {locale: de}), [date]);

    const weeklyStats = useMemo(() => {
        const stats = {};
        daysOfWeek.forEach(day => {
            const dayKey = format(day, 'yyyy-MM-dd');
            stats[dayKey] = dailyStats[dayKey] || {
                exercisesCompleted: 0,
                workouts: 0,
                totalDuration: 0,
                totalCalories: 0,
            };
        });
        return stats;
    }, [dailyStats, daysOfWeek]);

    return (
        <View>
            <View style={styles.donutChartContainer}>
                {daysOfWeek.map(day => {
                    const dayName = format(day, 'EEEE', {locale: de});
                    const dayKey = format(day, 'yyyy-MM-dd');

                    return (
                        <View key={dayName} style={styles.boxStyle}>
                            <Text style={[
                                styles.headerCounterLabel,
                                dayName === markedDate && styles.currentDayLabel
                            ]}>
                                {dayName.charAt(0)}
                            </Text>
                            <DonutChart
                                key={dayName}
                                percentage={weeklyStats[dayKey]?.exercisesCompleted || 0}
                                color={colors.baseColor}
                                delay={1000}
                                max={15}
                                withLabel={false}
                                radius={20}
                            />
                        </View>
                    );
                })}
            </View>
            <View style={styles.bigDonutContainer}>
                <View style={styles.bigChartContainer}>
                    <View>
                        <Text style={styles.maxText} numberOfLines={2} ellipsizeMode="tail">Abgeschlossene
                            Workouts</Text>
                        <Text style={styles.detailsLarge}>{dailyStats[selectedDate]?.exercisesCompleted || 0}</Text>
                    </View>
                    <BigDonutChart
                        progress={dailyStats[selectedDate]?.exercisesCompleted || 0}
                        max={15}
                    />
                </View>
                <View style={styles.detailsContainer}>
                    <View style={styles.container}>
                        <Text style={styles.text}>Minuten</Text>
                        <Text
                            style={styles.details}>{Math.round((dailyStats[selectedDate]?.totalDuration || 0) / 60)} Min</Text>
                    </View>
                    <View style={styles.container}>
                        <Text style={styles.textRight}>Kalorien</Text>
                        <Text
                            style={styles.details}>{Math.round(dailyStats[selectedDate]?.totalCalories) || 0} kcal</Text>
                    </View>
                </View>
            </View>
        </View>
    );
};

export default WeekStats;

const createStyles = (fontSizes: FontSize, colors: Colors) => {
    return StyleSheet.create({
        container: {
            flexDirection: "column",
        },
        donutChartContainer: {
            flexDirection: "row",
            justifyContent: "space-between",
        },
        boxStyle: {
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "flex-end",
        },
        headerCounterLabel: {
            color: colors.label,
            fontFamily: Fonts.regular,
            fontSize: fontSizes.subhead,
            alignSelf: "center",
        },
        currentDayLabel: {
            fontFamily: Fonts.semiBold,
            color: colors.baseColor,
        },
        maxText: {
            color: colors.label,
            fontFamily: Fonts.regular,
            fontSize: fontSizes.subhead,
            width: 150,
            marginTop: -5
        },
        text: {
            color: colors.label,
            fontFamily: Fonts.regular,
            fontSize: fontSizes.subhead,
            textAlign: "left",
        },
        textRight: {
            color: colors.label,
            fontFamily: Fonts.regular,
            fontSize: fontSizes.subhead,
            textAlign: "right",
        },
        detailsLarge: {
            color: colors.baseColor,
            fontFamily: Fonts.semiBold,
            fontSize: fontSizes.largeTitle,
        },
        details: {
            color: colors.baseColor,
            fontFamily: Fonts.semiBold,
            fontSize: fontSizes.title3,
        },
        detailsContainer: {
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 20,
            marginBottom: -5,
            //backgroundColor: colors.red
        },
        bigChartContainer: {
            flexDirection: "row",
            justifyContent: "space-between",
        },
        bigDonutContainer: {
            backgroundColor: colors.secondary,
            borderRadius: ThemeSizes.Radius.card,
            padding: 15,
            marginTop: ThemeSizes.Spacing.horizontalSmall,
        }
    });
};
