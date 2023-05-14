import { ref, reactive } from 'vue'

export interface User {
	id: string
	firstName: string
	lastName: string
	address?: string
	city?: string
	code: string
}

export interface TourGroup {
	email: string,
	phoneNumber: string
	member: User[]
}

const attendees = ref<number | null>(0);
const tourGroup = reactive<TourGroup>({
	email: '',
	phoneNumber: '', 
	member: [{
		id: `att-${attendees.value}`,
		firstName: '',
		lastName: '',
		address: '',
		city: '',
		code: '',
	}]
})

export function usePassengers() { 

	const applicantData = () => {
		console.log('applicantData')
		const numberOfAttendees = attendees.value || 0;

    for (let i = 0; i < numberOfAttendees; i++) {
				tourGroup.member.push({
					id: `att-${i+1}`,
					firstName: '',
					lastName: '',
					code: ''
				})
			}
		}

	return {
		attendees,
		tourGroup,
		applicantData
	}
}
