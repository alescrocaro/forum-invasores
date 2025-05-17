import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Slider from "@mui/material/Slider";
import Button from "@mui/material/Button";
import ArrowDropDownCircleIcon from "@mui/icons-material/ArrowDropDownCircle";

import {
  DescricaoG,
  DescricaoB,
  OpenFilterButton,
  FiltersContent,
  Filters,
  FilterButtonWrapper,
} from "./style";

export default function StyledCard({
  title = "SEM TITULO",
  userName,
  dateFound,
  filter = false,
  mapControls,
  applyFilters,
}) {
  const [isFiltersOpen, setFiltersOpen] = useState(false);
  const [filterTag, setFilterTag] = useState(""); // Estado para o filtro de tag

  // Slider do raio de busca
  const handleSearchRadius = (event, newValue) => {
    mapControls.setSearchRadius(newValue);
  };

  // Botão de abrir filtros
  const openFilters = () => {
    setFiltersOpen(!isFiltersOpen);
    mapControls?.setShowRadius(!mapControls?.getShowRadius());
  };

  // Botão de aplicar filtros
  const handleFiltros = () => {
    const filters = {
      mapSearchRadius: 2 ** mapControls?.getSearchRadius(),
      mapCenter: mapControls?.getMapCenter(),
      tag: filterTag, // Adiciona a tag ao filtro
    };

    openFilters();
    applyFilters(filters);
  };

  const date = new Date(dateFound);

  return (
    <>
      <Card
        sx={{
          margin: "2vh 0",
          backgroundColor: "#3D3D3D",
          width: "100%",
          height: "fit-content",
        }}
      >
        <CardContent sx={{ padding: "16px !important" }}>
          <div
            id="card-content"
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              paddingBottom: "0px",
            }}
          >
            <div
              id="texts"
              style={{
                display: "flex",
                flexDirection: "column",
                color: "white",
              }}
            >
              <Typography
                vartiant="h5"
                style={{
                  fontFamily: "Montserrat, Sans Serif",
                  fontWeight: "600",
                  letterSpacing: "-0.05em",
                }}
              >
                {title}
              </Typography>
            </div>
            <div id="filter">
              {filter && (
                <OpenFilterButton onClick={openFilters}>
                  <Typography
                    size="large"
                    style={{
                      fontFamily: "Montserrat, Sans Serif",
                      fontWeight: "600",
                    }}
                  >
                    FILTROS
                  </Typography>
                  <ArrowDropDownCircleIcon
                    className={isFiltersOpen ? "inverter" : ""}
                    sx={{ fontSize: "1.5rem", margin: "-.1em 0 0 5px" }}
                  />
                </OpenFilterButton>
              )}
            </div>
          </div>
        </CardContent>

        {/* Filtros */}
        {isFiltersOpen && (
          <Filters>
            <FiltersContent>
              {/* Slider do Raio de Busca */}
              <div style={{ marginBottom: "1.5rem" }}>
                <DescricaoG>
                  <b>Raio de Busca:</b>
                </DescricaoG>
                <Slider
                  value={mapControls.getSearchRadius()}
                  min={0}
                  step={1}
                  max={14}
                  scale={(v) => 2 ** v}
                  getAriaValueText={(v) => `${v} KM`}
                  valueLabelFormat={(v) => `${v} KM`}
                  onChange={handleSearchRadius}
                  valueLabelDisplay="auto"
                  aria-labelledby="non-linear-slider"
                  sx={{ color: "#14aa6b", margin: "10px 0" }}
                />
                <DescricaoB>
                  ℹ️ O filtro é aplicado com base no centro visual do mapa.
                </DescricaoB>
              </div>

              {/* Input de Busca por Tag */}
              <div style={{ marginBottom: "1.5rem" }}>
                <DescricaoG>
                  <b>Buscar por Tag:</b>
                </DescricaoG>
                <input
                  type="text"
                  placeholder="Digite uma tag"
                  value={filterTag}
                  onChange={(e) => setFilterTag(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "0.5rem",
                    borderRadius: "4px",
                    border: "1px solid #ccc",
                    marginTop: "5px",
                  }}
                />
              </div>
            </FiltersContent>

            {/* Botão Filtrar */}
            <FilterButtonWrapper>
              <Button
                variant="contained"
                color="success"
                sx={{ backgroundColor: "#14aa6b" }}
                onClick={handleFiltros}
              >
                Filtrar
              </Button>
            </FilterButtonWrapper>
          </Filters>
        )}
      </Card>
    </>
  );
}
