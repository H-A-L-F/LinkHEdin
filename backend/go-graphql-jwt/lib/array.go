package lib

func RemoveArrayByIndex(slice []string, s int) []string {
	return append(slice[:s], slice[s+1:]...)
}
