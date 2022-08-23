package lib

import "math/rand"

func rangeIn(low, hi int) int {
	return low + rand.Intn(hi-low)
}
