import { Button } from '@/src/components/Button'
import { ScrollView, Text, View } from 'react-native'

export default function DesignScreen() {
    return (
        <ScrollView className="flex-1 bg-neutral-100 p-4">
            <Text className="font-display text-2xl mb-6">Design System</Text>

            <Text className="font-display text-lg mb-3 mt-4">Buttons</Text>

            <View className="gap-2 mb-4">
                <Button variant="primary">Primary</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="destructive">Destructive</Button>
                <Button disabled>Disabled</Button>
            </View>

            <Text className="font-display text-lg mb-3 mt-6">Spacing</Text>
            <View className="gap-2">
                <View className="h-4 bg-primary" />
                <View className="h-8 bg-secondary" />
                <View className="h-12 bg-destructive" />
            </View>
        </ScrollView>
    )

}