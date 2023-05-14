import { ref } from 'vue'

export interface TimelineItem {
  id: number
  status: string
  isSelected: boolean
}

const timeline = ref([
  {
    status: 'Vlucht zoeken',
    isSelected: false,
    id: 0,
  },
  {
    status: 'Selecteer vlucht',
    isSelected: false,
    id: 1,
  },
  {
    status: 'Passagiers',
    isSelected: false,
    id: 2,
  },
  {
    status: 'Delivered',
    isSelected: false,
    id: 3,
  },
])

export function useTimeline() { 

  const selectSearchTimelinex = () => {
    console.log('selectSearchTimeline')
  }

  const selectTimeline = (id: number) => {
    const item = timeline.value.find((item) => item.id === id);
    if (item) {
      item.isSelected = !item.isSelected;
    }
  }

	return {
		timeline,
    selectTimeline,
	}
}
