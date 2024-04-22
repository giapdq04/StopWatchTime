import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'

const StopWatchTime = () => {
    const [second, setSecond] = useState(0)
    const [minute, setMinute] = useState(0)
    const [hour, setHour] = useState(0)
    const [intervalId, setIntervalId] = useState(null)
    const [isRunning, setIsRunning] = useState(false)

    const handleStart = () => {
        setIsRunning(true)
        clearInterval(intervalId) // Xóa interval cũ trước khi tạo mới
        const id = setInterval(() => {
            setSecond(second => {
                if (second === 59) {
                    setMinute(minute => {
                        if (minute === 59) {
                            setHour(hour => hour + 1)
                            return 0
                        } else {
                            return minute + 1
                        }
                    })
                    return 0
                } else {
                    return second + 1
                }
            })

        }, 1000)
        setIntervalId(id) // Lưu intervalId mới vào state
    }

    const handleStop = () => {
        clearInterval(intervalId) // Dừng interval dựa trên intervalId trong state
        setHour(0)
        setMinute(0)
        setSecond(0)
        setIsRunning(false)
    }

    const handlePause = () => {
        clearInterval(intervalId) // Dừng interval dựa trên intervalId trong state
        setIsRunning(false)
    }

    return (
        <View style={st.container}>
            <Text
                style={{
                    color: '#fff',
                    fontSize: 48,
                    fontWeight: 'bold'
                }}>
                {hour.toString().padStart(2, '0')}:
                {minute.toString().padStart(2, '0')}:
                {second.toString().padStart(2, '0')}

            </Text>

            <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-evenly' }}>
                <TouchableOpacity
                    onPress={isRunning ? handlePause : handleStart}
                    style={{
                        borderRadius: 100,
                        borderColor: '#bf2230',
                        borderWidth: 3,
                        width: 150,
                        height: 150,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                    <Text style={{
                        color: '#bf2230',
                        fontSize: 24,
                        fontWeight: 'bold'
                    }}>
                        {isRunning ? 'Tạm dừng' : (hour === 0 && minute === 0 && second === 0) ? 'Bắt đầu' : 'Tiếp tục'}
                    </Text>
                </TouchableOpacity>

                {
                    (hour !== 0 || minute !== 0 || second !== 0) &&
                    <TouchableOpacity
                        onPress={handleStop}
                        style={{
                            borderRadius: 100,
                            borderColor: '#bf2230',
                            borderWidth: 3,
                            width: 150,
                            height: 150,
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                        <Text style={{
                            color: '#bf2230',
                            fontSize: 24,
                            fontWeight: 'bold'
                        }}>
                            Đặt lại
                        </Text>
                    </TouchableOpacity>
                }
            </View>


        </View>
    )
}

export default StopWatchTime

const st = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-evenly',
        alignItems: 'center',
        backgroundColor: '#23272e'
    }
})
