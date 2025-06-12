import { App, Astal, Gtk, Gdk, Audio } from "astal/gtk4"
import { Variable, bind, exec} from "astal"

export default function Slider(props) {
   const currentValue = Variable("")
  return  <box
            cssClasses={["group-menu"]}
            valign={Gtk.Align.START}
            orientation={Gtk.Orientation.VERTICAL}
            hSpacing={8}
            >
            <label halign={Gtk.Align.START} label={`${props.title}`}/>
            <label cssClasses={["state"]}halign={Gtk.Align.START} label={"Normal"}/>
            <box vexpand valign={Gtk.Align.END} cssClasses={["audio-slider"]}>
                <overlay>
                      <box >
                        <slider
                          hexpand
                            onValueChanged={slider => {
                              // log(slider.value)
                              if(props.title == "Brightness") {
                                const round = Math.round(slider.value * 100)
                                log(round)
                                  exec(`sh -c "brightnessctl set ${round}%"`)
                              }
                              props.item.volume = slider.value
                              currentValue.set(slider.value)
                              }}
                            value={props.initialValue}
                            />
                          </box>
                        <label
                            label={currentValue((v) => `${Math.round(v * 100)}`)}
                            halign={Gtk.Align.START}
                            valign={Gtk.Align.CENTER}
                            type="overlay"
                            canFocus={false}
                            canTarget={false}
                            passThrough
                        />
                        <box
                            halign={Gtk.Align.END}
                            valign={Gtk.Align.CENTER}
                            type="overlay"
                            canFocus={false}
                            canTarget={false}
                            passThrough
                        >
                            <Gtk.Image cssClasses={["icon"]} iconName={`${props.icon}`}/>
                        </box>
                </overlay>
              </box>
            </box>
}
