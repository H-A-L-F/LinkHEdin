package lib

import (
	"math/rand"
	"time"
)

func RangeIn(low, hi int) int {
	rand.Seed(time.Now().UnixNano())
	return low + rand.Intn(hi-low)
}
