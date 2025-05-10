package main

import (
	"encoding/json"
	"io"
	"log"
	"net/http"

	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)

type Todo struct {
	ID        int    `json:"id"`
	Todo      string `json:"todo"`
	Completed bool   `json:"completed"`
	UserID    int    `json:"userId"`
}

type ApiResponse struct {
	Todos []Todo `json:"todos"`
	Total int    `json:"total"`
	Skip  int    `json:"skip"`
	Limit int    `json:"limit"`
}

func getExternalTodos(c echo.Context) error {
	resp, err := http.Get("https://dummyjson.com/todos?limit=3")
	if err != nil {
		log.Println("Error fetching data:", err)
		return c.JSON(http.StatusInternalServerError, map[string]string{"error": "Failed to fetch data"})
	}
	defer resp.Body.Close()

	body, err := io.ReadAll(resp.Body)
	if err != nil {
		log.Println("Error reading response body:", err)
		return c.JSON(http.StatusInternalServerError, map[string]string{"error": "Failed to read data"})
	}

	//If we didn't know the shape of the data -
	// - map[string]interface{}
	// - map[string]any
	// we could type like this to get a generic response

	var apiResp ApiResponse
	if err := json.Unmarshal(body, &apiResp); err != nil {
		log.Println("Error unmarshalling JSON:", err)
		return c.JSON(http.StatusInternalServerError, map[string]string{"error": "Failed to parse data"})
	}

	return c.JSON(http.StatusOK, apiResp)
}

func main() {
	e := echo.New()
	e.Use(middleware.CORS())
	e.GET("/todos", getExternalTodos)
	e.Start(":8080")
}
